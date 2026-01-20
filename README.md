# Chrono-Type

**A time-traveling text editor.**

Chrono-Type is a minimalist writing tool that doesn't just save *what* you wrote, but *how* you wrote it. It records every keystroke and timestamp, creating a session timeline that can be replayed like a video.

##  Features

* **Session Recording:** Captures every character change relative to the start time.
* **Cinema Mode:** Replay your writing session from start to finish.
* **Visual Scrubber:** A progress bar that tracks the playback timeline.
* **Auto-Save:** Automatically persists your session to LocalStorage so you don't lose work.
* **Speed Control:** (Optional) Playback at 1x or 2x speed.

## Technical Implementation

This project is built entirely in **Vanilla JavaScript** (no frameworks) to demonstrate mastery of asynchronous event handling and performance patterns.

### Key Concepts Used:

1. **Delta Recording:** Instead of saving static text, we store an array of event objects: `[{ offset: 1200, value: "Hello" }]`.
2. **Debouncing (Data Persistence):** The auto-save function is *debounced* to ensure we only write to `localStorage` when the user pauses typing, preventing performance degradation.
3. **Throttling (UI Performance):** The scrubber bar updates are *throttled* during playback to cap DOM manipulation at 60fps, ensuring smooth rendering without layout thrashing.
4. **Event Loop Management:** Uses `requestAnimationFrame` rather than `setInterval` for a non-blocking playback engine.



##  How to Run

1. Clone the repository.
2. Open `index.html` in your browser.
3. Start typing.
4. Hit **Play** to watch the replay.

## Future Improvements

* **Diff-Based Storage:** Currently stores full string snapshots. Refactor to store operational transforms (Diffs) to save memory on long documents.
* **Export to GIF:** Use a canvas library to export the playback as a shareable GIF.
* **Heatmap:** Visualizing where the most edits/backspaces occurred.