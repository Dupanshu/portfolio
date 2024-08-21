# <span style="color:#42806e;">[Portfolio](https://dupanshu.github.io/portfolio/)</span>

### About
Hello! I’m Dupanshu, a Software Developer student with a strong foundation in C# for backend development and JavaScript for frontend development. I am recognized for my quick learning abilities, strong problem-solving skills, and a passion for innovation. I am eager to apply my technical expertise in a dynamic software development role.

### Technical Skills
- **Programming Languages**: C#, SQL, JavaScript, HTML/CSS
- **Libraries & Frameworks**: React, .NET, APIs
- **Tools & Platforms**: Git, GitHub, SSMS, Netlify, LINQ, Notion, Freshdesk

### Contact
1. [**Email**](mailto:rangrayd5@gmail.com)
2. [**Linkedin**](https://www.linkedin.com/in/dupanshu-dupanshu-7556a1271?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BcydEECUIT9CXlHdAK0VpdA%3D%3D)
3. [**Website**](https://dupanshu.github.io/portfolio/)


### Design inspirations
This portfolio is inspired by 
- [Britanny Chaing v1 portfolio](https://v1.brittanychiang.com/) which showcases a clean and modern design approach.
- [CODEPEN](https://codepen.io/) from where the hover effect for project section is taken.
- [Custom API](https://github.com/Dupanshu/cdn-projects) where I used <ins>Custom API</ins> creating a JSON file to showcase my projects using JavaScript
```JavaScript
// Custom api link
const URL = 'https://cdn.jsdelivr.net/gh/dupanshu/cdn-projects/projects.json';

async function getProjects(endpoint) {
  try {
    const result = await fetch(endpoint);

    if (!result.ok) {
      throw new Error(`${result.statusText} (${result.status})`);
    }

    const data = await result.json();
    for (let i = 0; i < data.results.length; i++) {
      const project = data.results[i];

      //function to create the element in the html for each project called from the API
      displayProjects(parameters);
    };
  } catch (error) {
    console.log(error.message);
  }
}

function displayProjects(parameters) {
  const projectDiv = document.createElement('div');
  projectDiv.classList.add('project-div');

  projectDiv.innerHTML = `    
    <div class="carousel">
      /* one project div */
    </div>
  `;
  projectContainer.appendChild(projectDiv);
}
```
