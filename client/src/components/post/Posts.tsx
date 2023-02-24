import classes from "./Posts.module.css";

const Posts = () => {
  return (
    <main className={classes.entries}>
      <div className={classes.entry}>
        <div className={classes.picture}>
          <img
            alt="image"
            src="https://techcrunch.com/wp-content/uploads/2022/10/CMC_3800.jpg?w=430&h=230&crop=1"
          />
        </div>
        <div className={classes.details}>
          <h2>Security researchers warn of a new class of Apple bugs</h2>
          <p>
            Security researchers say they have uncovered a “new class” of
            vulnerabilities that could allow attackers to bypass Apple’s
            security protections in iOS and macOS to access users’ sensitive
            data. Trellix’s Advanced Research Center published details this week
            of the privilege escalation vulnerabilities — meaning they allow
            someone to gain an elevated...
          </p>
        </div>
      </div>
      <div className={classes.entry}>
        <div className={classes.picture}>
          <img
            alt="image"
            src="https://techcrunch.com/wp-content/uploads/2022/10/CMC_3800.jpg?w=430&h=230&crop=1"
          />
        </div>
        <div className={classes.details}>
          <h2>Security researchers warn of a new class of Apple bugs</h2>
          <p>
            Security researchers say they have uncovered a “new class” of
            vulnerabilities that could allow attackers to bypass Apple’s
            security protections in iOS and macOS to access users’ sensitive
            data. Trellix’s Advanced Research Center published details this week
            of the privilege escalation vulnerabilities — meaning they allow
            someone to gain an elevated...
          </p>
        </div>
      </div>
      <div className={classes.entry}>
        <div className={classes.picture}>
          <img
            alt="image"
            src="https://techcrunch.com/wp-content/uploads/2022/10/CMC_3800.jpg?w=430&h=230&crop=1"
          />
        </div>
        <div className={classes.details}>
          <h2>Security researchers warn of a new class of Apple bugs</h2>
          <p>
            Security researchers say they have uncovered a “new class” of
            vulnerabilities that could allow attackers to bypass Apple’s
            security protections in iOS and macOS to access users’ sensitive
            data. Trellix’s Advanced Research Center published details this week
            of the privilege escalation vulnerabilities — meaning they allow
            someone to gain an elevated...
          </p>
        </div>
      </div>
    </main>
  );
};

export default Posts;
