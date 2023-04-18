import "../homepage/homepage.css";

function Homepage() {
    const styles = {
        section1: 'mb-[60vh] mt-3 mx-24 p-5 bg-slate-100 rounded-md opacity-60 bg-fixed bg-cover h-screen',
        section2: 'mb-[60vh] mx-24 p-5 bg-slate-100 rounded-md opacity-60 bg-fixed bg-cover h-screen',
        section3: 'mb-3 mx-24 p-5 bg-slate-100 rounded-md opacity-60 bg-fixed bg-cover h-screen',
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
