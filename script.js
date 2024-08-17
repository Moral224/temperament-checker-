const questions = [
    {
        question: "1. How do you react when something doesn't go your way?",
        answers: {
            choleric: "I get frustrated and try to take control of the situation.",
            phlegmatic: "I remain calm and try to avoid conflict.",
            sanguine: "I don't let it bother me; I move on quickly.",
            melancholic: "I feel sad and reflect on what went wrong."
        }
    },
    {
        question: "2. How do you handle group projects?",
        answers: {
            choleric: "I naturally take the lead and direct others.",
            phlegmatic: "I go along with the group's decisions.",
            sanguine: "I enjoy the social interaction and keep everyone motivated.",
            melancholic: "I focus on making sure everything is done perfectly."
        }
    },
    {
        question: "3. What is your approach to making decisions?",
        answers: {
            choleric: "I make decisions quickly and confidently.",
            phlegmatic: "I prefer to think it over and avoid hasty decisions.",
            sanguine: "I go with my gut feeling and what seems fun.",
            melancholic: "I analyze all possible outcomes before deciding."
        }
    },
    {
        question: "4. How do you deal with criticism?",
        answers: {
            choleric: "I defend myself and try to prove I'm right.",
            phlegmatic: "I listen quietly and try to avoid conflict.",
            sanguine: "I brush it off and don't take it too seriously.",
            melancholic: "I take it personally and dwell on it."
        }
    }
];

let scores = {
    choleric: 0,
    phlegmatic: 0,
    sanguine: 0,
    melancholic: 0
};

function renderQuestions() {
    const questionsDiv = document.getElementById('questions');
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<p>${q.question}</p>`;
        
        for (let temperament in q.answers) {
            const label = document.createElement('label');
            label.innerHTML = `
                <input type="radio" name="question${index}" value="${temperament}">
                ${q.answers[temperament]}
            `;
            questionDiv.appendChild(label);
            questionDiv.appendChild(document.createElement('br'));
        }
        
        questionsDiv.appendChild(questionDiv);
    });
}

function calculateTemperament() {
    const inputs = document.querySelectorAll('input[type="radio"]:checked');
    
    if (inputs.length < questions.length) {
        Swal.fire({
            icon: 'warning',
            title: 'Incomplete',
            text: 'Please answer all the questions before submitting.'
        });
        return;
    }

    inputs.forEach(input => {
        scores[input.value]++;
    });
    
    const highestScore = Math.max(...Object.values(scores));
    const temperament = Object.keys(scores).find(key => scores[key] === highestScore);
    
    Swal.fire({
        icon: 'info',
        title: 'Your Temperament',
        text: `Your temperament is: ${temperament.charAt(0).toUpperCase() + temperament.slice(1)}`,
        confirmButtonText: 'OK'
    });
}

document.getElementById('submitBtn').addEventListener('click', calculateTemperament);

renderQuestions();