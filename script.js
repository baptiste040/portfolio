const output = document.getElementById("output");
const input = document.getElementById("commandInput");
const cursor = document.querySelector(".cursor");

// Hide cursor when typing
input.addEventListener("focus", () => {
  cursor.style.display = "none";
});

input.addEventListener("blur", () => {
  cursor.style.display = "inline-block";
});

const quests = {
  projectViewed: false,
  videoWatched: false,
  easterEggFound: false,
};

function resetProgress() {
  quests.projectViewed = false;
  quests.videoWatched = false;
  quests.easterEggFound = false;
  localStorage.removeItem("quests");
}

function loadProgress() {
  const saved = localStorage.getItem("quests");
  if (saved) {
    try {
      const parsedQuests = JSON.parse(saved);
      // Vérifier que les données sont valides
      if (typeof parsedQuests === "object" && parsedQuests !== null) {
        Object.assign(quests, parsedQuests);
      } else {
        resetProgress();
      }
    } catch (e) {
      // En cas d'erreur de parsing, réinitialiser les quêtes
      resetProgress();
    }
  }
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

  projects: `🚀 My Real Projects:

1. 📰 InsightFlow - AI-powered personalized news aggregator that fights information overload and enables efficient monitoring
   → <a href="https://www.myinsightflow.com/" target="_blank">Visit InsightFlow</a>

2. 💸 HunterBoard - First gamified affiliate platform that allows anyone to earn money by promoting apps/SaaS/newsletters
   → <a href="https://www.hunterboard.app/" target="_blank">Visit HunterBoard</a>

3. 🔧 New Project (In Development) - More details coming soon!

Type 'project 1', 'project 2', etc. to see more details.`,

  "project 1": `📰 InsightFlow:
An algorithm with high personalization capabilities that transforms how people stay informed.
Fights information overload by filtering and synthesizing content from 100+ sources.
Delivers essential, personalized news directly to users' inboxes.`,

  "project 2": `💸 HunterBoard:
The first gamified affiliate platform solving the acquisition problem for digital products.
Enables anyone to earn money through content creation by promoting apps/SaaS/newsletters.
Features a mission board system that connects creators with high-commission opportunities.`,

  "project 3": `🔧 New Project (In Development):
My third major project is currently under construction.
More details will be revealed soon!`,

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

  progress: function () {
    return getProgressText();
  },

  "sudo hire-me": `💼 Hiring protocol initiated...
🎯 You've unlocked the secret command.
Congratulations, you've just recruited a motivated badass.`,

  "sudo reset": function () {
    resetProgress();
    return "🔄 Progress has been reset. All quests are now locked again.";
  },
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
    // Ne pas affecter la quête videoWatched ici
    appendOutput(
      "💡 Hint: Try watching the video presentation to unlock more hints!"
    );
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
    // Check if the command is a function
    if (typeof commands[command] === "function") {
      appendOutput(commands[command]());
    } else {
      appendOutput(commands[command]);
    }

    if (command === "cv") {
      // No longer auto-opening the CV
    }

    if (command.startsWith("project")) {
      quests.projectViewed = true;
      saveProgress();
    }

    if (command === "video") {
      quests.videoWatched = true;
      saveProgress();
      // Ajouter un indice après avoir regardé la vidéo
      setTimeout(() => {
        appendOutput(
          "💡 Hint unlocked: It's something you'd want to say to a recruiter..."
        );
      }, 1000);
    }

    if (command === "sudo hire-me") {
      quests.easterEggFound = true;
      saveProgress();

      // Enhanced glitch effect
      const terminal = document.getElementById("terminal");
      terminal.classList.add("glitch");

      // Flash effect
      document.body.style.backgroundColor = "#fff";
      setTimeout(() => {
        document.body.style.backgroundColor = "";
        terminal.classList.remove("glitch");
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

window.onload = function () {
  // Décommentez la ligne suivante pour forcer une réinitialisation des quêtes
  // resetProgress();

  loadProgress();
  initParticles();
  bootTerminal();
};

// Initialize particles.js
function initParticles() {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 50,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#00ff88",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00ff88",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "grab",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
}

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
  cursor.style.display = "none";

  const lines = [
    "booting terminal...",
    "loading AI modules...",
    "establishing secure connection...",
    "ready.",
    "👋 Welcome to the terminal of Baptiste Allain",
  ];

  // Ajouter le message approprié en fonction de l'état des quêtes
  if (quests.easterEggFound) {
    lines.push(
      "Type 'help' to see available commands, or 'secrets' to access unlocked content 🔓"
    );
  } else {
    lines.push(
      "Type 'help' to see available commands, or 'quests' for a challenge 🕹️"
    );
  }

  for (const line of lines) {
    await typeLine(line);
    await new Promise((r) => setTimeout(r, 300));
  }

  input.disabled = false;
  input.focus();
  cursor.style.display = "inline-block";
}

function getProgressText() {
  return `Progress:
${quests.projectViewed ? "✅" : "❌"} Quest 1 - Project viewed
${quests.videoWatched ? "✅" : "❌"} Quest 2 - Video watched
${quests.easterEggFound ? "✅" : "❌"} Quest 3 - Secret found${
    quests.easterEggFound ? " (secrets unlocked!)" : ""
  }`;
}
