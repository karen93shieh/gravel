// +page.js
export async function load() {
    const response = await fetch('/data/tripSummary.json');
    const data = await response.json();
    return {
        props: {
            tripSummary: data.tripSummary // We extract only tripSummary
        }
    };
}
