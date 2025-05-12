const output = document.getElementById("output");
const input = document.getElementById("commandInput");

const commands = {
  help: `Available commands:
- about       → learn more about me
- projects    → see my Data/AI projects
- cv          → download my CV
- contact     → get in touch
- clear       → clear the terminal`,

  about: `I'm [Ton prénom], a data enthusiast currently studying at [École].
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
[Click here](assets/cv.pdf) if it doesn't open automatically.`,

  contact: `📧 Email: prenom.nom@email.com
🔗 LinkedIn: linkedin.com/in/tonprofil
🐙 GitHub: github.com/tonpseudo`,
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

window.onload = () => {
  appendOutput("👋 Welcome to the terminal of [Ton Nom]");
  appendOutput("Type 'help' to see available commands.");
};
