# fairpay
Fairpay is a website that allows employees to securely share salary and 
employment information with others. Employees can use it to
 learn how their compensation compares to others in the same company and industry,
 and thus gain leverage in negotiating future salaries.

## Get Started

<p>Create a .env file in your root directory</p>

<p>Paste your PostgresQL connection string, saved as PG_URI={your string here}</p>
<p>(We have dummy data set up to create the tables, if you need help ask one of wonderful wunderpus members)</p>

<p>You also need to register an application with the 
LinkedIn API and obtain a key and secret. These must be specified
in the .env file as LINKEDIN_KEY and LINKEDIN_SECRET </p>

<p>Run npm install</p>
<p>Either npm run build, then npm start</p>
<p>Or for development, npm run dev</p>
