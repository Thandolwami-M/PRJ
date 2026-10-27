# AntiSleep --- Developer README

## 1. Requirements

Before starting the project, make sure you have:

-   Node.js installed
-   VS Code installed
-   The AntiSleep project folder

You can check Node.js with:

``` bash
node -v
```

You can check npm with:

``` bash
npm -v
```

------------------------------------------------------------------------

## 2. Start the Application

### Step 1 --- Open the project

Open the **AntiSleep** project folder in VS Code.

### Step 2 --- Open the terminal

In VS Code:

**Terminal → New Terminal**

### Step 3 --- Install dependencies

Run this the first time you open the project:

``` bash
npm install
```

### Step 4 --- Start the development server

Normally run:

``` bash
npm run dev
```

If PowerShell gives this error:

``` text
npm.ps1 cannot be loaded because running scripts is disabled
```

use:

``` bash
npm.cmd run dev
```

Alternatively, open a **Command Prompt** terminal in VS Code and run:

``` cmd
npm run dev
```

### Step 5 --- Open the application

Vite will display a local address such as:

``` text
http://localhost:5173/
```

Open that address in your browser.

------------------------------------------------------------------------

## 3. View the App on a Phone

To demo the application on a phone:

1.  Connect the phone and computer to the same Wi-Fi network.
2.  Start Vite with:

``` bash
npm.cmd run dev -- --host
```

3.  Look for the **Network** address shown by Vite, for example:

``` text
http://192.168.1.105:5173/
```

4.  Open that Network address on the phone.

Keep the development server running while using the phone demo.

------------------------------------------------------------------------

## 4. Editing the Project

Open the project in VS Code.

Most frontend pages are located in:

``` text
src/pages/
```

Each page normally has its own JSX and CSS file.

Examples:

``` text
src/pages/Dashboard.jsx
src/pages/Dashboard.css

src/pages/LiveDrive.jsx
src/pages/LiveDrive.css

src/pages/Settings.jsx
src/pages/Settings.css

src/pages/History.jsx
src/pages/History.css

src/pages/TripSummary.jsx
src/pages/TripSummary.css

src/pages/PairDevice.jsx
src/pages/PairDevice.css

src/pages/Login.jsx
src/pages/Login.css

src/pages/Register.jsx
src/pages/Register.css
```

### Editing a page

1.  Open the `.jsx` file to change the page structure or functionality.
2.  Open the matching `.css` file to change the appearance.
3.  Save the file with **Ctrl + S**.
4.  Check the browser.

Vite normally updates the application automatically.

------------------------------------------------------------------------

## 5. Editing Navigation

The application's routes are in:

``` text
src/App.jsx
```

This controls which URL opens each page.

For example:

``` jsx
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/live-drive" element={<LiveDrive />} />
<Route path="/settings" element={<Settings />} />
```

If you add or rename a page, check `App.jsx`.

------------------------------------------------------------------------

## 6. If Changes Do Not Appear

Try these steps in order:

### 1. Save the file

Press:

``` text
Ctrl + S
```

### 2. Refresh the browser

Press:

``` text
Ctrl + R
```

### 3. Restart Vite

Stop the terminal with:

``` text
Ctrl + C
```

Then start it again:

``` bash
npm.cmd run dev
```

### 4. Reinstall dependencies

If the project reports missing packages:

``` bash
npm install
```

Then:

``` bash
npm.cmd run dev
```

------------------------------------------------------------------------

## 7. Common Problems

### Problem: `npm.ps1 cannot be loaded`

Use:

``` bash
npm.cmd run dev
```

or switch the VS Code terminal to **Command Prompt**.

------------------------------------------------------------------------

### Problem: `npm run dev` says the command is unknown

Make sure you are inside the AntiSleep project folder.

Then run:

``` bash
npm install
```

and:

``` bash
npm.cmd run dev
```

------------------------------------------------------------------------

### Problem: A page is blank

Check the VS Code terminal and browser console for errors.

Then check:

``` text
src/App.jsx
```

Make sure the page is imported and has the correct route.

------------------------------------------------------------------------

### Problem: A CSS change is not appearing

Check that the JSX file imports the correct CSS file.

Example:

``` jsx
import "./Dashboard.css";
```

Then save and refresh the browser.

------------------------------------------------------------------------

### Problem: The phone cannot open the app

Check:

1.  PC and phone are on the same Wi-Fi.
2.  Vite was started with:

``` bash
npm.cmd run dev -- --host
```

3.  You are using the **Network** address, not `localhost`.
4.  The PC firewall is not blocking the connection.
5.  The Vite terminal is still running.

------------------------------------------------------------------------

## 8. Important Editing Rules

Before changing existing functionality:

-   Check the current code first.
-   Avoid deleting working functionality unnecessarily.
-   Keep page filenames consistent.
-   Keep JSX and CSS imports consistent.
-   Test the page after making changes.
-   Test navigation after changing routes.
-   Do not commit `node_modules`.

When adding a new dependency, update the project through npm rather than
manually copying packages.

------------------------------------------------------------------------

## 9. Resetting Prototype Data

The current frontend stores some prototype data in the browser's
`localStorage`.

If testing creates old connection, settings, or drive-history data,
clear the site's local storage through the browser's developer tools.

This may reset prototype values such as:

``` text
glassesConnected
alertSound
vibrationAlert
lastDriveAlerts
lastDriveDuration
lastCompletedDrive
driveHistory
```

After clearing the data, reload the application and test again.

------------------------------------------------------------------------

## 10. Stopping the Application

To stop the development server:

``` text
Ctrl + C
```

To start it again later:

``` bash
npm.cmd run dev
```

------------------------------------------------------------------------

## 11. Recommended Team Workflow

When editing the project:

``` text
Open project
    ↓
npm install (first setup)
    ↓
Start development server
    ↓
Edit code in VS Code
    ↓
Save
    ↓
Test in browser
    ↓
Fix errors
    ↓
Test again
```

Always test the application after making changes before sending the
updated project to another team member.
