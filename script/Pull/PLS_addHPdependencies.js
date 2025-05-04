async function loadDependenciesHP() {
    try {
        const response = await fetch('./HomePageDependencies.html'); // Fetch the dependencies file
        const text = await response.text();

        // Create a container for the fetched content
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = text;

        // Append all styles and scripts dynamically
        document.head.append(...tempDiv.querySelectorAll('link, style, script'));
    } catch (error) {
        console.error('Error loading dependencies:', error);
    }
}

loadDependenciesHP();