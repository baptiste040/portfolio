const output = document.getElementById("output");
const input = document.getElementById("commandInput");

const quests = {
  projectViewed: false,
  videoWatched: false,
  easterEggFound: false,
};

function loadProgress() {
  const saved = localStorage.getItem("quests");
  if (saved) Object.assign(quests, JSON.parse(saved));
}

function saveProgress() {
  localStorage.setItem("quests", JSON.stringify(quests));
}

loadProgress();

const commands = {
  help: `Available commands:
- about       → learn more about me
- projects    → see my Data/AI projects
- cv          → download my CV
- video       → watch my presentation
- contact     → get in touch
- quests      → view available quests
- progress    → check your quest progress
- clear       → clear the terminal`,

  about: `I'm Baptiste Allain, a data enthusiast currently studying at EURECOM.
EURECOM, MSc in Data Science & Artificial Intelligence, expected 2026
Passionate about AI, data storytelling, and building smart tools.
Always curious, always learning. 🚀`,

  projects: `1. 🧠 Predictive model for student performance (Python, Scikit-Learn)
2. 📊 Dashboard Airbnb prices (Python + Tableau)
3. 🤖 Chatbot with Hugging Face

Type 'project 1', 'project 2', etc. to see more.`,

  "project 1": `🧠 Predictive Model:
Used regression to predict student grades from study habits.
Libraries: pandas, scikit-learn, matplotlib.`,

  "project 2": `📊 Dashboard Airbnb:
Scraped and analyzed Airbnb prices in Paris.
Built a Tableau dashboard to visualize price clusters.`,

  "project 3": `🤖 Chatbot:
Created a chatbot using Transformers (Hugging Face).
Fine-tuned on custom dataset.`,

  cv: `📄 Downloading CV...
<a href="assets/cv.pdf" target="_blank">👉 Click here to open my CV</a>`,

  video: `🎬 Opening video presentation...
<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">👉 Click here to watch my video</a>`,

  contact: `📧 Email: baptiste.allainpr@proton.me
📱 Téléphone: 06 43 60 07 14
🔗 LinkedIn: https://www.linkedin.com/in/allain-baptiste/
🐙 GitHub: github.com/baptiste040`,

  quests: `Available Quests:
- [quest 1] View a project
- [quest 2] Watch my video
- [quest 3] Find the secret command
Type 'progress' to see your completion status.`,

  progress: `Progress:
${quests.projectViewed ? "✅" : "❌"} Quest 1 - Project viewed
${quests.videoWatched ? "✅" : "❌"} Quest 2 - Video watched
${quests.easterEggFound ? "✅" : "❌"} Quest 3 - Secret found`,

  "sudo hire-me": `💼 Hiring protocol initiated...
🎯 You've unlocked the secret command.
Congratulations, you've just recruited a motivated badass.`,
};

function appendOutput(text) {
  output.innerHTML += `\n${text}`;
  output.scrollTop = output.scrollHeight;
}

function handleCommand(cmd) {
  const command = cmd.trim().toLowerCase();
  appendOutput(`> ${command}`);

  if (command === "clear") {
    output.innerHTML = "";
    return;
  }

  if (commands[command]) {
    appendOutput(commands[command]);

    // Quests auto-tracking
    if (command === "projects") {
      quests.projectViewed = true;
      saveProgress();
      appendOutput("💡 Hint unlocked: The secret command starts with 'sudo'");
    }

    if (command === "about") {
      quests.videoWatched = true;
      saveProgress();
      appendOutput(
        "💡 Hint unlocked: It's something you'd want to say to a recruiter..."
      );
    }

    if (command === "cv") {
      window.open("assets/cv.pdf", "_blank");
    }

    if (command.startsWith("project")) {
      quests.projectViewed = true;
      saveProgress();
    }

    if (command === "video") {
      quests.videoWatched = true;
      saveProgress();
    }

    if (command === "sudo hire-me") {
      quests.easterEggFound = true;
      saveProgress();

      // Add glitch effect
      document.getElementById("terminal").classList.add("glitch");
      setTimeout(() => {
        document.getElementById("terminal").classList.remove("glitch");
      }, 400);

      appendOutput(commands[command]);

      // Optional: open CV automatically
      setTimeout(() => {
        window.open("assets/cv.pdf", "_blank");
      }, 1000);
    }
  } else {
    appendOutput(`Command not found: ${command}
Type 'help' to see available commands.`);
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    handleCommand(input.value);
    input.value = "";
  }
});

window.onload = bootTerminal;

async function typeLine(line, delay = 30) {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      output.innerHTML += line[i];
      output.scrollTop = output.scrollHeight;
      i++;
      if (i >= line.length) {
        clearInterval(interval);
        output.innerHTML += "\n";
        resolve();
      }
    }, delay);
  });
}

async function bootTerminal() {
  input.disabled = true;

  const lines = [
    "booting terminal...",
    "loading AI modules...",
    "establishing secure connection...",
    "ready.",
    "👋 Welcome to the terminal of Baptiste Allain",
    "Type 'help' to see available commands, or 'quests' for a challenge 🕹️",
  ];

  for (const line of lines) {
    await typeLine(line);
    await new Promise((r) => setTimeout(r, 300));
  }

  input.disabled = false;
  input.focus();
}
