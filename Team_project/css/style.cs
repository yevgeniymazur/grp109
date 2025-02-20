/* Reset and Base Styles */
body 
{
    font-family: 'Arial', sans-serif;
    line-height: 1.6;
    background-image:url("../images/image22.JPG");
    background-position: right top;
    background-size: cover; 
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
/* Navigation Styles links N*/
.navbar 
{
    background-color: #E2EAF4;
    padding: 1rem 2rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
	position: sticky;
	top: 0;
}
.nav-brand {
	font-family: 'ArchivoNarrowRegular';
    font-size: 1.5rem;
    font-weight: bold;
    color: #5B5983;
    margin-bottom: 1rem;
}
.nav-links {
    list-style: none;
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}
.nav-links a {
    text-decoration: none;
    color: #666;
    font-weight: 500;
    transition: color 0.3s ease;
}
/*style for main nav when it is mouse over*/
.nav-links a:hover,
.nav-links a.active
{
    color: #007bff;
}
img.artImage
{
	box-shadow: 4px 4px 4px #999;
  transition: all 200ms ease-in-out;
  width: 300px;
  height: auto;
}
/* validation page images style*/
img.artImage2
{
	box-shadow: 4px 4px 4px #999;
  transition: all 200ms ease-in-out;
  width: 400px;
  height: auto;
}
/* hobby images style*/
img.artImage22
{
	box-shadow: 4px 4px 4px #999;
  transition: all 200ms ease-in-out;
  width: 230px;
  height: auto;
}
/* footer navigation Styles links 2025*/

.foot-links a:hover,
.foot-links a.active 
{
    color: #2f4f4f;
    font-size: 14px;
}
.foot-links a 
{
    font-size: 14px;
    text-decoration: none;
    color: #777;
    font-weight: 200;
    transition: color 0.3s ease;
}

/* Main Content Styles Welcome to My Portfolio section N*/
.content 
{
    flex: 1;
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 1rem;
}
.content-section {
    margin-bottom: 2rem;
}
/* Main Content Styles Welcome to My Portfolio section N*/
.hero {
    text-align: center;
    padding: 3rem 0;
    background-color: #ffffff;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
/* Main Content Styles Welcome to My Portfolio section N*/
.hero h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 1rem;
}
/* Main Content Styles Welcome to My Portfolio section subtitle N*/
.subtitle {
    font-size: 1.2rem;
    color: #666;
}
li
{
	    color: #666;
}
/* Main Content Styles about me section  N*/
.about-me {
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
/* Main Content Styles About me section header style  N*/
.about-me h2 {
    color: #333;
    margin-bottom: 1.5rem;
}
/* Main Content Styles About me section body style  N*/
.profile-content {
    display: flex;
    gap: 2rem;
}
/* Main Content Styles About me section body style  N*/
.profile-text p {
    margin-bottom: 1rem;
    color: #666;
}
/* Main Content Styles My Skills section body style  N*/
.skills 
{
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.skills h2 
{
    color: #333;
    margin-bottom: 1.5rem;
}
.skills-grid 
{
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
}

.skill-item {
    background-color: #f8f9fa;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
    color: #666;
}
.row {
     display: flex;
    gap: 20px;
}
.column {
    flex: 1;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 5px;
        }
footer {
    font-size: 12px;
    background-color: #DFDEE4;
    padding: 5px;
    text-align: center;
    color: #666;
    box-shadow: 0 -2px 2px rgba(0,0,0,0.1);
}
/* Main content styles NL*/
.main-content 
{
    flex: 1;
    padding: 2rem 1rem;
}
/* Main content styles  first about me block NL*/
.content-container {
    max-width: 1200px;
    margin: 0 auto;
    background-color: #ffffff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    color: #333;
    margin-bottom: 1.5rem;
}

h2 {
    color: #444;
    margin-bottom: 1rem;
}

p {
    color: #666;
    margin-bottom: 1rem;
}

/* Footer styles */
.footer {
    background-color: #ffffff;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
    padding: 1.5rem 0;
    margin-top: auto;
}

