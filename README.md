# Domino But Web
**Course:** Front-end Development - CESAR School

<div align="center">

![Version](https://img.shields.io/badge/version-1.0-blue.svg)
![Status](https://img.shields.io/badge/status-released-green.svg)
![Contributors](https://img.shields.io/badge/contributors-1-orange.svg)

</div>

---

## 1. About The Project

**Domino But Web** is an interactive, web-based Domino game created as a project for the Front-end course at CESAR School. The application demonstrates core concepts of JavaScript for game logic, advanced CSS for a custom "Neumorphic" UI, and dynamic HTML for user interaction.

The game allows users to either play against another person or watch an automated simulation of the game being played by two NPCs.

---

## 2. Features

-   **Two Game Modes:**
    -   🎮 **Player vs. Player:** Manually draw and place pieces on the board.
    -   🤖 **NPC vs. NPC Simulation:** Watch the game play out automatically.
-   **Simulation Controls:**
    -   **Play/Pause:** Start and stop the automated simulation.
    -   **Step-by-Step:** Advance the simulation one move at a time.
    -   **Full Simulation:** Instantly run the simulation to completion.
    -   **Speed Control:** Adjust the speed of the automated playback with a slider.
-   **Interactive UI:**
    -   A dynamic game board that updates in real-time.
    -   A control panel displaying game stats (pieces remaining, board size).
    -   A real-time log that provides feedback on every move.
-   **Custom Styling:**
    -   A unique "Neumorphic" (soft UI) design with custom-styled buttons, panels, and sliders.
    -   Custom fonts and a dark color scheme.
    -   Styled scrollbars and sliders for a cohesive look.
-   **Responsive Design:** The layout adapts to different screen sizes for a good experience on both desktop and mobile devices.

---

## 3. Technologies Used

-   **HTML5:** For the core structure and content of the application.
-   **CSS3:** For all styling, layout, responsive design, and the custom Neumorphic theme.
-   **JavaScript (ES6):** For all game logic, DOM manipulation, user interactions, and simulation controls.

---

## 4. File Structure

The project consists of three main files:

-   `index.html`: Contains the HTML structure for the game board, control panel, buttons, and other UI elements.
-   `style.css`: Houses all the CSS rules, including variable definitions for the color scheme, layout with CSS Grid, custom styles for UI components (sliders, scrollbars), and media queries for responsiveness.
-   `main.js`: The engine of the game. It includes:
    -   **Game Classes:** `Peca` (Piece), `Tabuleiro` (Board), and `BurrinhoInteligente` (Game Engine) to manage the game's state and logic.
    -   **UI Functions:** A set of functions to handle DOM updates, button clicks, and rendering the game state on the screen.
    -   **Event Listeners:** To manage interactions with the simulation speed slider.
    -   **Testing Harness:** A simple set of console tests to verify the core piece-insertion logic on page load.

---

## 5. How to Run

No special setup is required. To run the game, simply open the `index.html` file in any modern web browser (e.g., Chrome, Firefox, Edge).

---

# Made by
| [<img loading="lazy" src="https://avatars.githubusercontent.com/u/47667167?v=4" width=115><br><sub>Pedro Villas Boas</sub>](https://github.com/PedroVillasBoas) |
| :---: |
