// scripts/serial-bridge.ts
// Reads JSON lines from the glasses over USB serial and forwards them
// to the backend telemetry endpoint in small batches.
import 'dotenv/config';
import { SerialPort, ReadlineParser } from 'serialport';

const API_URL = process.env.API_URL ?? 'http://localhost:4000';
const SERIAL = process.env.DEVICE_SERIAL ?? '';
const KEY = process.env.DEVICE_API_KEY ?? '';
const SESSION_ID = process.env.SESSION_ID ?? '';
const VENDOR_ID = process.env.GLASSES_VENDOR_ID?.toLowerCase();
const BAUD = 115200;   // matches Serial.begin() in the firmware
const FLUSH_MS = 2000; // 1 request per 2 s = 30/min, under the 120/min rate limit

if (!SERIAL || !KEY || !SESSION_ID) {
  console.error('Set DEVICE_SERIAL, DEVICE_API_KEY and SESSION_ID in .env');
  process.exit(1);
}

let seq = Date.now();
let buffer: object[] = [];
const clamp01 = (n: number) => Math.min(1, Math.max(0, n));

// Map the glasses' JSON fields onto what the backend expects
function toSample(r: any) {
  seq = Math.max(seq + 1, Date.now()); // always increasing, even across restarts
  const closed = Math.max(0, Math.round(Number(r.closureMs) || 0));
  return {
    sequenceNumber: seq,
    capturedAt: new Date().toISOString(),
    eyeClosedMs: closed,
    blinkRate: Math.max(0, Number(r.bpm) || 0),
    confidence: 1,
    drowsinessScore: r.alarm ? 1 : clamp01(closed / 2000),
  };
}

async function flush() {
  if (!buffer.length) return;
  const samples = buffer.splice(0, 250);
  try {
    const res = await fetch(`${API_URL}/api/v1/telemetry/batch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-device-serial': SERIAL,
        'x-device-key': KEY,
      },
      body: JSON.stringify({ sessionId: SESSION_ID, samples }),
    });
    if (!res.ok) console.error('Backend rejected batch:', res.status, await res.text());
  } catch {
    console.error('Backend unreachable, will retry');
    buffer.unshift(...samples);
  }
}
setInterval(flush, FLUSH_MS);

function onLine(line: string) {
  const text = line.trim();
  if (!text.startsWith('{')) {
    if (text) console.log('[glasses]', text); // calibration messages
    return;
  }
  try {
    buffer.push(toSample(JSON.parse(text)));
  } catch {
    /* partial line, ignore */
  }
  if (buffer.length > 1000) buffer.splice(0, buffer.length - 1000);
}

let listed = false;
async function findGlasses() {
  const ports = await SerialPort.list();
  if (!VENDOR_ID) {
    if (!listed) {
      console.log('Set GLASSES_VENDOR_ID in .env. Ports found:', ports);
      listed = true;
    }
    return undefined;
  }
  return ports.find(p => p.vendorId?.toLowerCase() === VENDOR_ID);
}

function connect() {
  void (async () => {
    const info = await findGlasses();
    if (!info) return void setTimeout(connect, 2000);

    let done = false;
    const retry = () => {
      if (done) return;
      done = true;
      console.log('Glasses not connected, waiting...');
      setTimeout(connect, 2000);
    };

    const port = new SerialPort({ path: info.path, baudRate: BAUD }, err => {
      if (err) {
        console.error(err.message);
        retry();
      } else {
        console.log('Glasses detected on', info.path);
      }
    });
    port.on('close', retry);
    port.on('error', retry);
    port.pipe(new ReadlineParser({ delimiter: '\n' })).on('data', onLine);
  })();
}
connect();
