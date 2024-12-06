import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [timeGoneBy, settimeGoneBy] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const calculateWordCount = (text) => {return text.split(/\s+/).filter(word => word.length > 0).length};
  const [wordCounts, wordCounter] = useState({});
  const [totalWordCount, setTotalWordCount] = useState(0);
  
  useEffect(() => {
    const sections = document.querySelectorAll('.section');
    const counts = {};
    let totalCount = 0;

    sections.forEach(section => {
      const text = section.innerText || section.textContent;
      const wordCount = calculateWordCount(text);
      counts[section.id] = wordCount;
      totalCount += wordCount;
    });

    wordCounter(counts);
    setTotalWordCount(totalCount);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const timeNow = new Date();
      const secondsGoneBy = Math.floor((timeNow - lastUpdated) / 1000);
      const hours = Math.floor(secondsGoneBy / 3600);
      const minutes = Math.floor((secondsGoneBy % 3600) / 60);
      const seconds = secondsGoneBy % 60;  
      settimeGoneBy(`${hours} hrs  ${minutes} min ${seconds} sec`);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastUpdated]);

  const handleAlert = () => {alert(`The site was last updated on ${lastUpdated.toLocaleString()}`)};

  const handleScrollToSection = (id) => {
    const section = document.getElementById(id);
    window.scrollTo({
      top: section.offsetTop - 180,
      behavior: 'smooth',
    });
    setActiveSection(id);
    setTimeout(() => {setActiveSection("")}, 800);
  };

  useEffect(() => {
    const handleScroll = () => {
      const tocElement = document.getElementById("table-of-contents");
      const rect = tocElement.getBoundingClientRect();
      setIsSticky(rect.top <= 0);
  
      const sections = document.querySelectorAll('.section');
      const tocButtons = document.querySelectorAll('.toc-list button');
  
      let activeIndex = -1;
  
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= 0) {activeIndex = index}});

      if (activeIndex === -1 && window.scrollY === 0) {activeIndex = 0};
  
      const isBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 10;
      if (isBottom) {
        activeIndex = sections.length - 1;
      }
  
      tocButtons.forEach((button, index) => {
        if (index === activeIndex) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className = "App">
      <header className = "App-header">
        <h1>Is mathmatics discovered, or all just a construct of the mind</h1>
        <p>Total Word Count: {totalWordCount}</p>
      </header>
      <main>
        <section id = "table-of-contents" className = {`toc-section ${isSticky ? "sticky" : ""}`}>
          <h2>Table of Contents</h2>
          <ul className = "toc-list">
            <li><button onClick={() => handleScrollToSection("a")}>Abstract</button></li>
            <li><button onClick={() => handleScrollToSection("ut")}>Universal Truth</button></li>
            <li><button onClick={() => handleScrollToSection("hc")}>Human Construct</button></li>
            <li><button onClick={() => handleScrollToSection("ec")}>Engineering & Computing</button></li>
            <li><button onClick={() => handleScrollToSection("c")}>Conclusion</button></li>
            <li><button onClick={() => handleScrollToSection("r")}>References</button></li>
            <li><button onClick={() => handleScrollToSection("v")}>Video</button></li>
          </ul>
        </section>

        <section id = "a" className = {`section ${activeSection === "a" ? "active" : ""}`}>
          <h2>Abstract</h2>
          <p className="word-count">Word Count: {wordCounts["a"]}</p>
          <p>
            Is mathematics discovered, like how an archaeologist will unearth fossils to discover 
            a truth we could not record, or is it made, akin to an artist creating a piece on a 
            blank canvas? Philosophers have been debating this topic for centuries. Platonism, 
            another name for mathematical realism, holds that mathematical facts and objects are 
            merely waiting to be discovered outside of the human mind. Formalism, on the other hand, 
            holds that mathematics is a human-made tool - a set of rules and symbols meant to help us 
            understand the world. To understand the nature of mathematics and how we use it in many 
            scientific fields, this article examines two conflicting perspectives to determine whether 
            mathematics reveals basic facts about the universe or is just a human framework applied to 
            it.
          </p>
        </section>

        <section id = "ut" className = {`section ${activeSection === "ut" ? "active" : ""}`}>
          <h2>Mathematics as a Universal Truth</h2>
          <p className = "word-count">Word Count: {wordCounts["ut"]}</p>
          <p>
            The notion of mathematical realism explains that mathematics exists independently of human 
            cognition and is an intrinsic component of the universe. The philosopher Plato and the physicist 
            Galileo, who described mathematics as the "language of the universe" (Galilei, 1623), are 
            proponents of this theory. Examples of natural structures that commonly make use of mathematical 
            concepts like the Fibonacci sequence and the Golden Ratio are the spirals of galaxies and the 
            arrangement of leaves on a stem. These trends suggest that mathematics is not only a human 
            invention but is embedded in the fundamental structure of nature.
          </p><p>
            Physics is often in favour of this view. Natural processes are surprisingly accurately described 
            by the mathematical formulas that constitute the basis of the laws of physics. For instance, 
            Einstein's theory of relativity uses complex mathematics to explain how spacetime warps. Einstein 
            (1915) asserted that the theory is accurate enough in forecasting actual occurrences, like the 
            bending of light around massive objects, to imply that mathematics must reflect a fundamental 
            order in the universe. Arithmetic is a fundamental truth, according to mathematical realism, which 
            maintains that these patterns and principles are "discovered," not manufactured.
          </p>
        </section>

        <section id = "hc" className = {`section ${activeSection === "hc" ? "active" : ""}`}>
          <h2>Mathematics as a Human Construct</h2>
          <p className="word-count">Word Count: {wordCounts["hc"]}</p>
          <p>
            In contrast, formalism argues that mathematics is a human invention, a set of concepts, laws, 
            and symbols meant to help us understand and describe the world. This point of view holds that 
            mathematics only occurs in the human mind. Different cultures and historical periods have created 
            their own systems and symbols for mathematics. Different societies have different mathematical 
            frameworks. For instance, the Egyptians employed a base-10 counting system, which is similar to 
            ours, whereas the Babylonians utilised a base-60 system (Kline, 1990).
          </p><p>
            Human needs and applications are also accommodated by mathematics. Think about non-Euclidean 
            geometries, which describe curved spaces in a different way from the well-known Euclidean system 
            (the geometry of flat surfaces). In order to solve problems in advanced physics, particularly when 
            describing spacetime, non-Euclidean geometry was created. The idea that math is a flexible instrument 
            created by humans rather than a rigid set of universal truths is supported by mathematicians' ability 
            to develop new systems that adapt to particular circumstances (Lobachevsky, 1829).
          </p><p>
            Additionally, computer science and algorithmic logic highlight the value of mathematics as a human 
            framework. Algorithms, the cornerstone of programming, are developed to solve specific problems and 
            simplify computations. Computers use binary, a number system that facilitates human-constructed thinking, 
            rather than any inherent property of the universe. In this way, maths is comparable to a language, 
            appropriate for a wide range of applications and limitations, suggesting that it is fundamentally a 
            human invention.
          </p>
        </section>

        <section id = "ec" className = {`section ${activeSection === "ec" ? "active" : ""}`}>
          <h2>The Role of Mathematics in Engineering and Computing</h2>
          <p className = "word-count">Word Count: {wordCounts["ec"]}</p>
          <p>
            Engineering and computers can provide useful insights into mathematics as a tool and a universal truth. 
            Engineers use mathematics to design everything, from software systems to bridges, where precision is 
            crucial for both operation and safety. But as engineering makes use of models and approximations, maths 
            is a practical tool meant to accomplish certain goals rather than a perfect representation of reality. 
            For instance, engineers approximate pi, despite the fact that it is an irrational, infinite decimal, in 
            order to facilitate computations. This illustration shows how engineering mathematics is tailored to human 
            requirements and how exact numbers are regularly changed for practicality (Bridgman, 1927).
          </p><p>
            Computing algorithms and data structures demonstrate how mathematics may be modified to satisfy human 
            needs. Computers simulate neural networks based on mathematical models that mimic human cognition. 
            Although helpful, these models are oversimplified and show that mathematics is not an absolute truth but 
            rather an interpretive tool. Math's application to a variety of computer tasks emphasises its adaptability 
            as a framework for resolving issues in human-made systems rather than its inherent universality.
          </p>
        </section>

        <section id = "c" className = {`section ${activeSection === "c" ? "active" : ""}`}>
          <h2>Conclusion</h2>
          <p className = "word-count">Word Count: {wordCounts["c"]}</p>
          <p>
            In conclusion, does mathematics exist as a fundamental reality that is outside of human awareness, or is 
            it entirely a product of human thought? There are strong arguments for both viewpoints. According to 
            mathematical realism, the exact laws of physics and natural patterns serve as examples of the inherent 
            order that mathematics represents. Contrarily, formalism highlights math's versatility, cultural diversity, 
            and real-world uses as proof that it was created by humans. In the end, mathematics might be both - a 
            byproduct of human thought that reflects universal patterns, acting as a tool and a window into the 
            organisation of the world. Despite the controversy, math's dual character as a human invention and a 
            potential reflection of universal truths is highlighted by the ways it is used in research, engineering, 
            and computing.
          </p>
        </section>

        <section id = "r" className = {`section ${activeSection === "r" ? "active" : ""}`}>
          <h2>References</h2>
          <ul>
            <li>Plato, 2002. The Republic (Trans. B. Jowett)</li>
            <li>Galilei, G., 1623. The Assayer (Il Saggiatore)</li>
            <li>Livio, M., 2002. The Golden Ratio: The Story of Phi, the World's Most Astonishing Number.</li>
            <li>Sprott, J. C., 2003. The Joy of x: A Guided Tour of Math, from One to Infinity</li>
            <li>Einstein, A., 1915. The General Theory of Relativity</li>
            <li>Hilbert, D., 1900. Mathematical Problems</li>
            <li>Kline, M., 1990. Mathematical Thought from Ancient to Modern Times</li>
            <li>Lobachevsky, N. I., 1829. Geometrical Investigations on the Theory of Parallels</li>
            <li>Knuth, D., 1997. The Art of Computer Programming</li>
            <li>Bridgman, P. W., 1927. The Physics of High Pressure</li>
            <li>Borwein, J. M. and Bailey, D. H., 2003. Mathematics and Modern Engineering Applications</li>
            <li>Cormen, T. H., Leiserson, C. E., Rivest, R. L. and Stein, C., 2009</li>
            <li>Tymoczko, T., 1998. The Philosophy of Mathematics: An Introduction</li>
            <li>Lakatos, I., 1976. Proofs and Refutations: The Logic of Mathematical Discovery</li>
            <li>Steiner, M., 2004. The Applicability of Mathematics as a Philosophical Problem</li>
            <li>Descartes, R., 1637. Discourse on the Method</li>
            <li>Wigner, E. P., 1960. The Unreasonable Effectiveness of Mathematics in the Natural Sciences</li>
          </ul>
        </section>

        <section id = "v" className = {`section ${activeSection === "v" ? "active" : ""}`}>
          <h2>Video of powerpoint presentation</h2>

          <video controls width = "100%">
            <source src="/videoo.mp4" type="video/mp4"/>
          </video>

        </section>
      </main>

      <button className = "floating-button" onClick = {handleAlert}>
        Updated: {timeGoneBy}
      </button>

      <footer className="App-footer">
        <img src = "WebBanner2023.png" alt="Footer Image" />
      </footer>

    </div>
  );
}

export default App;
