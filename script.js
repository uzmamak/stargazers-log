const statusMessage = document.querySelector("#status");
const repositoryList = document.querySelector("#repositories");

function renderRepository(repository) {
  const item = document.createElement("li");
  item.className = "repository";

  const heading = document.createElement("div");
  heading.className = "repository-heading";

  const link = document.createElement("a");
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.repository;

  const date = document.createElement("time");
  date.dateTime = repository.starredAt;
  date.textContent = new Date(`${repository.starredAt}T00:00:00`).toLocaleDateString(
    undefined,
    { year: "numeric", month: "short", day: "numeric" }
  );

  const description = document.createElement("p");
  description.textContent = repository.description;

  heading.append(link, date);
  item.append(heading, description);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("./events.json");
    if (!response.ok) {
      throw new Error(`Could not load repositories (${response.status}).`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(renderRepository));
    statusMessage.textContent = repositories.length
      ? ""
      : "No starred repositories yet.";
  } catch (error) {
    statusMessage.textContent = "Could not load starred repositories. Please try again later.";
    console.error(error);
  }
}

loadRepositories();
