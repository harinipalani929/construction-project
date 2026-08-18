const projectForm = document.getElementById("projectForm");

const projectList = document.createElement("div");
projectList.id = "projectList";

projectForm.parentElement.appendChild(projectList);


// Add Project
projectForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    const inputs = projectForm.querySelectorAll("input");
    const name = inputs[0].value;
    const location = inputs[1].value;
    const progress = Number(inputs[2].value);
    const budget = Number(inputs[3].value);

    if (progress < 0 || progress > 100) {
        alert("Progress must be between 0 and 100.");
        return;
    }

    try {

        const response = await fetch("http://localhost:3000/projects", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: name,
                location: location,
                progress: progress,
                budget: budget
            })
        });

        const result = await response.json();

        if (!response.ok) {
            alert("Error: " + result.error);
            return;
        }

        alert("Project added successfully!");

        projectForm.reset();

        displayProjects();

    } catch (error) {

        console.log(error);

        alert("Cannot connect to backend.");
    }
});


// Display projects
async function displayProjects() {

    try {

        const response = await fetch(
            "http://localhost:3000/projects"
        );

        const projects = await response.json();

        projectList.innerHTML = "";

        if (projects.length === 0) {

            projectList.innerHTML =
                "<p>No projects added yet.</p>";

            return;
        }

        const heading = document.createElement("h3");

        heading.textContent = "Projects";

        projectList.appendChild(heading);


        projects.forEach(function (project) {

            const projectCard =
                document.createElement("div");

            projectCard.className = "project-card";

            projectCard.innerHTML = `
                <h4>${project.location}</h4>

                <p>
                    <strong>Progress:</strong>
                    ${project.progress}%
                </p>

                <p>
                    <strong>Budget:</strong>
                    ₹${project.budget}
                </p>
            `;

            projectList.appendChild(projectCard);
        });

    } catch (error) {

        console.log(error);

        projectList.innerHTML =
            "<p>Unable to load projects.</p>";
    }
}


// Load projects when website opens
displayProjects();