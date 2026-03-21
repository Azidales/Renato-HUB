document.addEventListener('DOMContentLoaded', () => {
    const greetingEl = document.getElementById('greeting');
    
    // Atualiza saudação com base na hora do dia
    const hour = new Date().getHours();
    let greetingText = 'Olá, Renato!';
    
    if (hour >= 5 && hour < 12) {
        greetingText = 'Bom dia, Renato!';
    } else if (hour >= 12 && hour < 18) {
        greetingText = 'Boa tarde, Renato!';
    } else if (hour >= 18 || hour < 5) {
        greetingText = 'Boa noite, Renato!';
    }
    
    greetingEl.textContent = greetingText;

    // Adiciona delay de animação em cascata para os cards
    const cards = document.querySelectorAll('.app-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.animation = `fadeIn 0.5s ease-out ${0.2 + (index * 0.1)}s forwards`;
    });
});
