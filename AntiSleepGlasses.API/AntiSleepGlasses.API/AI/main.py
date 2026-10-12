import time
import requests
import random
import winsound
import tkinter as tk
from datetime import datetime, timezone

print("AI Anti-Sleep Glasses system started!")
print("------------------------------------")

# ==========================================================
# C# API ENDPOINTS
# ==========================================================

session_url = "https://localhost:7121/api/Sessions"
event_url = "https://localhost:7121/api/DrowsinessEvents"

# Existing test driver
driver_id = 3


# ==========================================================
# CREATE DRIVING SESSION
# ==========================================================

session = {
    "startTime": datetime.now(timezone.utc).isoformat(),
    "endTime": None,
    "totalAlerts": 0,
    "driverID": driver_id
}

session_response = requests.post(
    session_url,
    json=session,
    verify=False
)

print("Session API Status Code:", session_response.status_code)
print("Session API Response:", session_response.text)

if session_response.status_code != 201:
    print("Could not create driving session.")
    exit()

session_data = session_response.json()
session_id = session_data["sessionID"]

print(f"New driving session started: {session_id}")
print("------------------------------------")


# ==========================================================
# AI SETTINGS
# ==========================================================

EAR_THRESHOLD = 0.20
DROWSINESS_DURATION = 0.3

# Alert/session variables
total_alerts = 0
eye_closed_start = None
alert_active = False


# ==========================================================
# DROWSINESS SCORE FUNCTION
# ==========================================================

def calculate_drowsiness_score(ear, eye_closed_duration):

    score = 0

    # ------------------------------------------------------
    # EAR SCORE
    # ------------------------------------------------------

    if ear >= 0.20:

        ear_score = 0

    elif ear >= 0.15:

        ear_score = 30

    else:

        ear_score = 50


    # ------------------------------------------------------
    # EYE CLOSURE DURATION SCORE
    # ------------------------------------------------------

    if eye_closed_duration < 0.1:

        duration_score = 0

    elif eye_closed_duration < 0.3:

        duration_score = 20

    elif eye_closed_duration < 0.5:

        duration_score = 30

    else:

        duration_score = 40


    # ------------------------------------------------------
    # COMBINE SCORES
    # ------------------------------------------------------

    score = ear_score + duration_score

    # Maximum score is 100
    score = min(score, 100)

    return score


# ==========================================================
# DETERMINE DROWSINESS LEVEL
# ==========================================================

def determine_drowsiness_level(score):

    if score <= 30:

        return "Alert"

    elif score <= 60:

        return "Mild Drowsiness"

    elif score <= 80:

        return "Moderate Drowsiness"

    else:

        return "Severe Drowsiness"


# ==========================================================
# SIMULATED SENSOR
# ==========================================================

sensor_step = 0


def get_sensor_reading():

    global sensor_step

    sensor_step += 1

    # ------------------------------------------------------
    # NORMAL AWAKE
    # ------------------------------------------------------

    if 1 <= sensor_step <= 30:

        return round(
            random.uniform(0.28, 0.35),
            2
        )


    # ------------------------------------------------------
    # NORMAL BLINK
    # ------------------------------------------------------

    elif 31 <= sensor_step <= 33:

        if sensor_step == 32:

            return 0.12

        else:

            return 0.31


    # ------------------------------------------------------
    # AWAKE AGAIN
    # ------------------------------------------------------

    elif 34 <= sensor_step <= 50:

        return round(
            random.uniform(0.28, 0.35),
            2
        )


    # ------------------------------------------------------
    # LEVEL 1 / MILD DROWSINESS
    # ------------------------------------------------------

    elif 51 <= sensor_step <= 56:

        return round(
            random.uniform(0.16, 0.19),
            2
        )


    # ------------------------------------------------------
    # DRIVER RECOVERS
    # ------------------------------------------------------

    elif 57 <= sensor_step <= 80:

        return round(
            random.uniform(0.28, 0.35),
            2
        )


    # ------------------------------------------------------
    # LEVEL 2 / SEVERE DROWSINESS
    # ------------------------------------------------------

    elif 81 <= sensor_step <= 88:

        return round(
            random.uniform(0.10, 0.14),
            2
        )


    # ------------------------------------------------------
    # DRIVER RECOVERS
    # ------------------------------------------------------

    elif 89 <= sensor_step <= 120:

        return round(
            random.uniform(0.28, 0.35),
            2
        )


    # ------------------------------------------------------
    # RESTART SIMULATION
    # ------------------------------------------------------

    else:

        sensor_step = 0

        return round(
            random.uniform(0.28, 0.35),
            2
        )


# ==========================================================
# MAIN AI LOOP
# ==========================================================

try:

    while True:

        # Get new sensor reading
        ear = get_sensor_reading()

        print(f"EAR reading: {ear:.2f}")


        # ==================================================
        # EYES CLOSED
        # ==================================================

        if ear < EAR_THRESHOLD:

            print("Eye status: CLOSED")

            # Start timer
            if eye_closed_start is None:

                eye_closed_start = time.time()


            # Calculate closure duration
            eye_closed_duration = (
                time.time() - eye_closed_start
            )


            # Calculate drowsiness score
            drowsiness_score = calculate_drowsiness_score(
                ear,
                eye_closed_duration
            )


            # Determine level
            drowsiness_level = determine_drowsiness_level(
                drowsiness_score
            )


            print(
                f"Eyes closed for: "
                f"{eye_closed_duration:.2f} seconds"
            )

            print(
                f"Drowsiness score: "
                f"{drowsiness_score}/100"
            )

            print(
                f"Drowsiness level: "
                f"{drowsiness_level}"
            )


            # ==================================================
            # DROWSINESS DETECTION
            # ==================================================

            if (
                eye_closed_duration >= DROWSINESS_DURATION
                and not alert_active
            ):

                total_alerts += 1

                alert_active = True

                detection_time = datetime.now(
                    timezone.utc
                )


                # ==================================================
                # DETERMINE SEVERITY
                # ==================================================

                if drowsiness_score >= 80:

                    severity = 2

                else:

                    severity = 1


                print("")
                print("⚠️ DROWSINESS DETECTED!")

                print(
                    f"Drowsiness Score: "
                    f"{drowsiness_score}/100"
                )

                print(
                    f"Drowsiness Level: "
                    f"{drowsiness_level}"
                )

                print(
                    f"Severity Level: "
                    f"{severity}"
                )


                # ==================================================
                # DETERMINE ALERT TYPE
                # ==================================================

                if severity == 1:

                    alert_type = "Visual"

                else:

                    alert_type = "Visual and Audible"


                print(
                    f"Alert: {alert_type}"
                )


                # ==================================================
                # AUDIBLE ALERT
                # ==================================================

                if severity == 2:

                    print(
                        "🔊 Playing audible warning..."
                    )

                    winsound.Beep(
                        1000,
                        1000
                    )


                # ==================================================
                # VISUAL ALERT
                # ==================================================

                root = tk.Tk()

                root.title(
                    "ANTI-SLEEP WARNING"
                )

                root.geometry(
                    "500x250"
                )


                label = tk.Label(

                    root,

                    text=(
                        "⚠️ DROWSINESS DETECTED!"
                        "\nWAKE UP!"
                    ),

                    font=(
                        "Arial",
                        24
                    )
                )


                label.pack(
                    expand=True
                )


                # Close warning after 2 seconds
                root.after(
                    2000,
                    root.destroy
                )


                root.mainloop()


                # ==================================================
                # SIMULATE DRIVER RESPONSE TIME
                # ==================================================

                response_time = random.randint(
                    500,
                    3000
                )


                print(
                    f"Response time: "
                    f"{response_time} ms"
                )

                print(
                    f"Detection time: "
                    f"{detection_time.isoformat()}"
                )


                # ==================================================
                # CREATE DROWSINESS EVENT
                # ==================================================

                event = {

                    "timestamp":
                        detection_time.isoformat(),

                    "severityLevel":
                        severity,

                    "alertTypeTriggered":
                        alert_type,

                    "responseTimeMs":
                        response_time,

                    "sessionID":
                        session_id
                }


                # ==================================================
                # SEND EVENT TO C# API
                # ==================================================

                response = requests.post(

                    event_url,

                    json=event,

                    verify=False
                )


                print(
                    "Event API Status Code:",
                    response.status_code
                )

                print(
                    "Event API Response:",
                    response.text
                )

                print(
                    f"Total alerts this session: "
                    f"{total_alerts}"
                )

                print(
                    "------------------------------------"
                )


        # ==================================================
        # EYES OPEN
        # ==================================================

        else:

            print("Eye status: OPEN")

            # Reset closure timer
            eye_closed_start = None

            # Allow another alert
            alert_active = False


        # ==================================================
        # SENSOR INTERVAL
        # ==================================================

        time.sleep(0.1)


# ==========================================================
# STOP SYSTEM WITH CTRL + C
# ==========================================================

except KeyboardInterrupt:

    print(
        "\nStopping AI Anti-Sleep Glasses system..."
    )


    # Session end time
    end_time = datetime.now(
        timezone.utc
    ).isoformat()


    # Update session
    session_update = {

        "endTime":
            end_time,

        "totalAlerts":
            total_alerts
    }


    # Close session
    response = requests.put(

        f"{session_url}/{session_id}",

        json=session_update,

        verify=False
    )


    print(
        "Session close status code:",
        response.status_code
    )


    if response.status_code == 204:

        print(
            "Driving session closed successfully."
        )

        print(
            f"Total alerts recorded: "
            f"{total_alerts}"
        )

        print(
            f"Session {session_id} ended at: "
            f"{end_time}"
        )


    else:

        print(
            "Could not close driving session."
        )

        print(
            "Response:",
            response.text
        )


    print("------------------------------------")

    print(
        "AI Anti-Sleep Glasses system stopped."
    )