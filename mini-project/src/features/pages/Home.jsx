import { useDispatch, useSelector } from "react-redux";
import { TimeDeadline } from "../../utils/date";
import { getStatusClass } from "../../utils/status";
import FilterWorkStatus from './../work/filter/FilterWorkStatus';
import { selectFilteredDeadLineStatus } from "../work/filter/FilterDeadlineAndStatusSelector";
import { setFilterDeadline, setShowWorkLimit } from "../work/WorkSlice";

function Home() {
  const dispatch = useDispatch();
  const totalWork = useSelector((s)=>s.user.users)
  const work = useSelector(selectFilteredDeadLineStatus);
  const showWork = useSelector((s) => s.user.showWorkLimit);

  const listWork = work.slice(0, showWork);
  const showMore = listWork.length < work.length;

  return (
    <main className="home">
      <header className="home-header">
        <div className="home-header-left">
          <h1 className="home-title">Your Work</h1>
          <p className="home-subtitle">
            You have <span className="home-badge">{totalWork.length}</span> tasks in
            total
          </p>
        </div>

        <div className="home-header-right">
          <select
            className="home-filter"
            defaultValue="all"
            onChange={(e) => dispatch(setFilterDeadline(e.target.value))}
          >
            <option value="all">All due dates</option>
            <option value="deadline">Due soon (≤ 2 days)</option>
            <option value="overdue">Overdue</option>
          </select>

          <div className="home-filter">
            <FilterWorkStatus />
          </div>
        </div>
      </header>

      <section className="home-list">
        {listWork.map((u) => (
          <article
            key={u.id}
            className={`work-card ${u.status ? "work-card--success" : ""}`}
          >
            <div className="work-card-main">
              <div className="work-card-top">
                <h3 className="work-card-title">Title:{u.title}</h3>
                <span
                  className={`work-status work-status--${getStatusClass(
                    u.statusWork
                  )}`}
                >
                  {u.statusWork || "No status"}
                  {console.log(u.statusWork)}
                </span>
              </div>

              <p className="work-card-desc">Description: {u.description}</p>
              <p className="work-card-deadline">
                Deadline: {TimeDeadline(u.deadline)}
              </p>
            </div>
          </article>
        ))}

        {showMore && (
          <div className="home-showMore">
            <button
              className="btnShowMore"
              onClick={() => dispatch(setShowWorkLimit(showWork + 3))}
            >
              Show more...
            </button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Home;
