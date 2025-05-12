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

  about: `Hey there! 👋 I'm Baptiste Allain

🚀 First and foremost, I'm passionate about entrepreneurship and building products that solve real problems.

🔍 Currently in my first year at EURECOM, where I'm learning the foundations of Data Science.
📊 Next year, I'll be specializing in database systems - a strategic choice to better understand how data drives business decisions.

💡 What drives me? Finding product-market fit, optimizing business processes, and developing strategies that help companies grow.

🛠️ I see technology as a tool to achieve business goals, not just for its own sake. I love the challenge of turning ideas into viable products and testing them in the real market.

🌱 My background combines business thinking with technical skills - a mix I believe is essential for today's entrepreneurial landscape.

👉 Check out my projects with the "projects" command!`,

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

  "sudo hire-me": `💼 Hiring protocol initiated...
🎯 You've unlocked the secret command.
Congratulations, you've just recruited a motivated badass.`,
};

const secretCommands = {
  secrets: `🔓 Secret commands unlocked:
- athlete    → check my athletics profile
- music      → discover my favorite song
- movie      → find out my favorite movie/actor`,

  athlete: `🏃‍♂️ My athletics profile:
<a href="https://bases.athle.fr/asp.net/athletes.aspx?base=records&seq=50495049445551484752445544555148" target="_blank">👉 Click here to see my athletics records</a>`,

  music: `🎵 My favorite song:
<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">👉 Click here to listen</a>`,

  movie: `🎬 My favorite movie:
Inception - I love how it blends mind-bending concepts with emotional storytelling.
Favorite actor: Leonardo DiCaprio - His performances in Inception and The Departed are outstanding.`,
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

  // Traitement spécial pour certaines commandes
  if (command === "projects") {
    appendOutput(commands[command]);
    quests.projectViewed = true;
    saveProgress();
    appendOutput("💡 Hint unlocked: The secret command starts with 'sudo'");
    return;
  }

  if (command === "about") {
    appendOutput(commands[command]);
    quests.videoWatched = true;
    saveProgress();
    appendOutput(
      "💡 Hint unlocked: It's something you'd want to say to a recruiter..."
    );
    return;
  }

  // Traitement spécial pour la commande progress
  if (command === "progress") {
    appendOutput(getProgressText());
    return;
  }

  // Traitement spécial pour les commandes secrètes
  if (command === "secrets") {
    if (quests.easterEggFound) {
      appendOutput(secretCommands[command]);
    } else {
      appendOutput(
        "🔒 Secrets are locked. Complete all quests to access them."
      );
    }
    return;
  }

  // Vérifier si c'est une commande secrète et si l'utilisateur a débloqué les secrets
  if (secretCommands[command]) {
    if (quests.easterEggFound) {
      appendOutput(secretCommands[command]);
    } else {
      appendOutput("🔒 This command is locked. Find the secret command first!");
    }
    return;
  }

  // Traitement normal pour les autres commandes
  if (commands[command]) {
    appendOutput(commands[command]);

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

      // Notification de déblocage des secrets
      setTimeout(() => {
        appendOutput(
          "🔓 SECRET LEVEL UNLOCKED! Type 'secrets' to discover hidden commands."
        );
      }, 1500);
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
    quests.easterEggFound
      ? "Type 'help' to see available commands, or 'secrets' to access unlocked content 🔓"
      : "Type 'help' to see available commands, or 'quests' for a challenge 🕹️",
  ];

  for (const line of lines) {
    await typeLine(line);
    await new Promise((r) => setTimeout(r, 300));
  }

  input.disabled = false;
  input.focus();
}

function getProgressText() {
  return `Progress:
${quests.projectViewed ? "✅" : "❌"} Quest 1 - Project viewed
${quests.videoWatched ? "✅" : "❌"} Quest 2 - Video watched
${quests.easterEggFound ? "✅" : "❌"} Quest 3 - Secret found${
    quests.easterEggFound ? " (secrets unlocked!)" : ""
  }`;
}
