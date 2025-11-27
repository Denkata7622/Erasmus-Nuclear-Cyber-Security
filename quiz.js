// Array for all the Quiz Questions 
const questions = [
  {
    text: "What does SCADA stand for?",
    answers: [
      "Secure Control And Digital Automation",
      "Supervisory Control And Data Acquisition",
      "Standard Computer And Data Access",
      "System Command And Direct Access"
    ],
    correct: 1
  },
  {
    text: "Nuclear power plants are completely safe from hackers because they are air-gapped (isolated).",
    answers: ["True", "False"],
    correct: 1
  },
  {
    text: "Which of the following is a potential impact of a cyberattack on a nuclear power plant?",
    answers: [
      "Ticking clock devices start counting down",
      "Loss of reactor cooling, risking an overheating",
      "Increased power output without control",
      "Only data theft, since physical systems are unaffected"
    ],
    correct: 1
  },
  {
    text: "A Programmable Logic Controller (PLC) is best described as:",
    answers: [
      "A high-powered general-purpose computer",
      "A type of virus that targets industrial plants",
      "A rugged industrial computer that controls machinery like pumps and valves",
      "An encryption device for securing networks"
    ],
    correct: 2
  },
  {
    text: "Which real-world cyber incident involved malware on USB drives damaging centrifuges in a nuclear facility?",
    answers: ["Flame", "Stuxnet", "WannaCry", "Shamoon"],
    correct: 1
  },
  {
    text: "What does air-gap mean in cybersecurity?",
    answers: [
      "A strong firewall with air-cooling",
      "A gap in the firewall logs",
      "No direct connection between a network and external systems",
      "A wireless connection through the air"
    ],
    correct: 2
  },
  {
    text: "Which of these is not typically considered part of nuclear plant cybersecurity measures?",
    answers: [
      "Network segmentation and firewalls",
      "Strict access control and guards",
      "Whitelisting only approved software",
      "Advertising on social media"
    ],
    correct: 3
  },
  {
    text: "According to experts, most recent cyber threats against nuclear facilities have been aimed at:",
    answers: [
      "Physical destruction of reactors",
      "Espionage (stealing data)",
      "Causing immediate explosions",
      "Damaging worker morale"
    ],
    correct: 1
  },
  {
    text: "The North Korean group that targeted Korea Hydro & Nuclear Power (KHNP) in 2014 was called:",
    answers: ["Lazarus Group", "Cozy Bear", "Kimsuky", "APT28"],
    correct: 2
  },
  {
    text: "Ransomware attackers now target Operational Technology (OT) networks and industrial systems, including energy plants.",
    answers: ["True", "False"],
    correct: 0
  },
  {
    text: "What is Stuxnet?",
    answers: [
      "A 2010 worm that targeted centrifuges and damaged Iran's enrichment program",
      "A ransomware that encrypted office files",
      "A DDoS tool used against websites",
      "A phishing campaign targeting employees"
    ],
    correct: 0
  },
  {
    text: "Which of the following best describes a defense-in-depth strategy?",
    answers: [
      "Relying on one very strong firewall only",
      "Using multiple layers of defense so a breach in one does not collapse the entire security",
      "Immediately responding with brute force if an attacker is spotted",
      "Disconnecting the reactor completely from electricity supply"
    ],
    correct: 1
  },
  {
    text: "What is a zero-day exploit?",
    answers: [
      "A known bug already patched by vendors",
      "A previously unknown vulnerability exploited before a patch exists",
      "A physical device used in maintenance",
      "An antivirus update distributed on day zero"
    ],
    correct: 1
  },
  {
    text: "In 2019, malware found at Kudankulam Nuclear Plant in India was linked to which group?",
    answers: ["Russian FSB hackers", "Chinese hacktivists", "North Korea's Lazarus Group", "Anonymous whistleblowers"],
    correct: 2
  },
  {
    text: "Why are insider threats a concern in nuclear cybersecurity?",
    answers: [
      "Insiders have legitimate access and can misuse it, intentionally or accidentally",
      "Insiders always install antivirus on every machine",
      "Insiders can never use USB drives",
      "Insiders avoid all network connections"
    ],
    correct: 0
  },
  {
    text: "Which of these is a common vulnerability in many Industrial Control Systems (ICS)?",
    answers: [
      "Use of Windows 10 exclusively",
      "Lack of any physical security",
      "Outdated, unpatched operating systems and weak network isolation",
      "No ability to run C++ programs"
    ],
    correct: 2
  },
  {
    text: "What is a data diode and how is it used?",
    answers: [
      "A two-way transfer device for fast file sharing",
      "A one-way network device that allows data to flow only out of a network",
      "A type of malware",
      "A physical guard at a control room door"
    ],
    correct: 1
  },
  {
    text: "Which best describes the primary goal of nuclear cybersecurity?",
    answers: [
      "Increase energy production efficiency",
      "Protect digital systems that control nuclear operations",
      "Promote public awareness of nuclear energy",
      "Advertise nuclear technology"
    ],
    correct: 1
  },
  {
    text: "Which threat actor is considered the most dangerous for nuclear facilities?",
    answers: ["Individual hobby hackers", "Nation-state attackers", "Local employees who dislike computers"],
    correct: 1
  }
];

// Quiz Variables
let index = 0;
let score = 0;

// Load Question Funtion
function showQuestion() {
    // Question info Variable
    const q = questions[index];
    const quizDiv = document.getElementById('quiz');

    // Create a button for each answer (can handle any ammount of answers)
    const answersHtml = q.answers.map((a, i) =>
        `<label>
            <input type="radio" name="answer" value="${i}"> ${a}
        </label><br>`
    ).join("");

    // Connect Question Structure Together
    quizDiv.innerHTML = `<h4>Question ${index + 1}/${questions.length}</h4><h3>${q.text}</h3>${answersHtml}`;
}

// Check answer and go to the next question (funtion)
function handleNext() {
  
    // Make a NodeList with all answers
    const radios = document.querySelectorAll('input[name=answer]');

    // Find chosen answer from NodeList
    let chosen = Array.from(radios).find(r => r.checked)?.value;

    // Check if answer is correct
    if (chosen !== undefined && parseInt(chosen) === questions[index].correct) {
        score++;
    }
    else if (chosen === undefined)
    {
        // For now nothing
        // Possible Warning and inability to progress further if answer is empty
        // No need as of now
    }

    // increase question number by 1
    index++;

    // Check if the User has reached the end of the quiz
    if (index < questions.length) {
        showQuestion();
    } else {
        document.getElementById("btnStart").style.display = "none";
        document.getElementById("timerFill").style.display = "none";
        document.getElementById('quiz').innerHTML =
            `<h3>Quiz completed! Your score: ${score}/${questions.length}</h3>`;
    }
}

// Quiz Timer Function
function startBarTimer(seconds, onFinish) {
    const fill = document.getElementById("timerFill");

    // Start at max lenght, end at 0 lenght
    fill.style.transition = 'none';
    fill.style.transform = "scaleX(1)";

    // Make smooth timerFill movement
    requestAnimationFrame(() => {
      fill.style.transition = `transform ${seconds}s linear`;
      fill.style.transform = "scaleX(0)";
    });

    // Start Timer Here
    setTimeout(() => {
      onFinish();
    }, seconds * 1000);
}

// Start Quiz Function
function startQuiz() {
    document.getElementById("btnStart").textContent = "Next";
    document.getElementById("btnStart").removeEventListener("click", startQuiz);
    document.getElementById("btnStart").addEventListener("click", handleNext);
    document.getElementById("timer").style.display = "block";

    // Start Quiz timer (8 minutes)
    startBarTimer(8 * 60, () => {
        document.getElementById("btnStart").style.display = "none";
        document.getElementById("quiz").innerHTML = `<h3>Time's up! Your score: ${score}/${questions.length}</h3>`
    });

    // Show first Question
    showQuestion();
}

// Hide timer on start
document.getElementById("timer").style.display = "none";

// Add click event to The "Next" button
document.getElementById("btnStart").addEventListener("click", startQuiz);
