const output = document.getElementById("output");
const input = document.getElementById("commandInput");

const commands = {
  help: `Available commands:
- about       → learn more about me
- projects    → see my Data/AI projects
- cv          → download my CV
- contact     → get in touch
- clear       → clear the terminal`,

  about: `I'm Baptiste, a data enthusiast currently studying at EURECOM.EURECOM, MSc in Data Science & Artificial Intelligence, expected 2026
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
<a href="assets/cv.pdf" target="_blank">👉 Click here to open my CV</a>`

  contact: `📧 Email: baptiste.allainpr@proton.me
🔗 LinkedIn: https://www.linkedin.com/in/allain-baptiste/
🐙 GitHub: github.com/baptiste040`,
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
    if (command === "cv") {
        window.open("assets/cv.pdf", "_blank");
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
    return new Promise(resolve => {
      let i = 0;
      const interval = setInterval(() => {
        output.innerHTML += line[i];
        output.scrollTop = output.scrollHeight;
        i++;
        if (i >= line.length) {
          clearInterval(interval);
          output.innerHTML += '\n';
          resolve();
        }
      }, delay);
    });
  }
  
  async function bootTerminal() {
    input.disabled = true;
  
    const lines = [
      'booting terminal...',
      'loading AI modules...',
      'establishing secure connection...',
      'ready.',
      '👋 Welcome to the terminal of Baptiste Delvaux',
      "Type 'help' to see available commands."
    ];
  
    for (const line of lines) {
      await typeLine(line);
      await new Promise(r => setTimeout(r, 300));
    }
  
    input.disabled = false;
    input.focus();
  }
  