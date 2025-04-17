export async function load() {
    const response = await fetch('/data/people.json');
    const data = await response.json();
    return { people: data };
  }
  