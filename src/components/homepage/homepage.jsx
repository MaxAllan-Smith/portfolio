import "../homepage/homepage.css";

function Homepage() {
  const styles = {
    section1:
      "mb-[50vh] p-5 bg-slate-100 rounded-md opacity-20 bg-fixed bg-cover",
    section2:
      "mb-[50vh] p-5 bg-slate-100 rounded-md opacity-20 bg-fixed bg-cover",
    section3:
      "mb-[50vh] p-5 bg-slate-100 rounded-md opacity-20 bg-fixed bg-cover",
  };
  return (
    <div id="formHomepage" className="">
      <section id="section1" className={styles.section1}>
        <h1>Section 1</h1>
      </section>
      <section id="section2" className={styles.section2}>
        <h1>Section 2</h1>
      </section>
      <section id="section3" className={styles.section3}>
        <h1>Section 3</h1>
      </section>
    </div>
  );
}

export default Homepage;
