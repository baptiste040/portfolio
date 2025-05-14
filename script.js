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
- quests      → view your quests progress
- clear       → clear the terminal
- contact     → get in touch`,

  about: `🎬 Watch my video presentation:
<div id="video-container" onclick="markVideoWatched()">
<iframe width="100%" height="250" src="https://www.youtube.com/embed/f1q-optnh2A" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

Hey there! 👋 I'm Baptiste Allain

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

  quests: function () {
    return `Quests:
${quests.projectViewed ? "✅" : "❌"} View a project (type 'projects')
${quests.videoWatched ? "✅" : "❌"} Watch my video (in 'about' section)
${quests.easterEggFound ? "✅" : "❌"} Find the secret command${
      quests.easterEggFound ? " (secrets unlocked!)" : ""
    }`;
  },

  contact: `📧 Email: baptiste.allainpr@proton.me
📱 Téléphone: 06 43 60 07 14
🔗 LinkedIn: https://www.linkedin.com/in/allain-baptiste/
🐙 GitHub: github.com/baptiste040`,

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
- athlete    → check my athletics profile`,

  athlete: `🏃‍♂️ My athletics profile:
<a href="https://bases.athle.fr/asp.net/athletes.aspx?base=records&seq=50495049445551484752445544555148" target="_blank">👉 Click here to see my athletics records</a>`,
};

function appendOutput(text) {
  output.innerHTML += `\n${text}`;
  output.scrollTop = output.scrollHeight;
}

function handleCommand(cmd) {
  const command = cmd.trim().toLowerCase();
  appendOutput(`> ${command}`);

  // Create synapse effect on command
  createSynapse();

  if (command === "clear") {
    output.innerHTML = "";
    return;
  }

  // Show thinking indicator for complex commands
  if (command !== "clear" && command !== "") {
    showThinking(true);

    // Simulate "thinking" with random synapses
    const synapseCount = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < synapseCount; i++) {
      setTimeout(() => createSynapse(), i * 200);
    }

    // Process command after "thinking"
    setTimeout(() => {
      showThinking(false);
      processCommand(command);
    }, 600);
  } else {
    processCommand(command);
  }
}

function processCommand(command) {
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
    // Appeler handleAboutCommand pour configurer l'événement de clic sur la vidéo
    setTimeout(handleAboutCommand, 100);
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

      // More intense synapse effect for easter egg
      for (let i = 0; i < 10; i++) {
        setTimeout(() => createSynapse(), i * 100);
      }

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
  createNeuralNetwork();
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

// Function to mark video as watched when clicking the link
function markVideoWatched() {
  quests.videoWatched = true;
  saveProgress();

  // Add hint after a short delay
  setTimeout(() => {
    appendOutput(
      "💡 Hint unlocked: It's something you'd want to say to a recruiter..."
    );
  }, 1000);
}

// Make the function available globally
window.markVideoWatched = markVideoWatched;

// Add event listener for when about command is executed
function handleAboutCommand() {
  // Set a timeout to trigger the video watched event when the iframe loads
  setTimeout(() => {
    const videoContainer = document.getElementById("video-container");
    if (videoContainer) {
      videoContainer.addEventListener("click", markVideoWatched);
    }
  }, 500);
}

// Create neural network visualization
function createNeuralNetwork() {
  const neuralNetwork = document.getElementById("neural-network");

  // Clear any existing content
  neuralNetwork.innerHTML = "";

  // We're not creating any static neural network visualization anymore
  // This keeps the element available for synapse effects but removes the static lines
}

// Create synapse effect
function createSynapse() {
  const synapses = document.querySelector(".synapses");
  const synapse = document.createElement("div");
  synapse.className = "synapse";

  // Random position
  const x = Math.random() * synapses.offsetWidth;
  const y = Math.random() * synapses.offsetHeight;

  synapse.style.left = `${x}px`;
  synapse.style.top = `${y}px`;

  synapses.appendChild(synapse);

  // Remove after animation completes
  setTimeout(() => {
    synapse.remove();
  }, 1000);
}

// Show thinking indicator
function showThinking(show = true) {
  const thinking = document.querySelector(".thinking-indicator");
  if (show) {
    thinking.classList.add("active");
  } else {
    thinking.classList.remove("active");
  }
}
