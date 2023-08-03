import React, { useEffect, useState } from 'react';
import './home.css';
import { GoHome } from 'react-icons/go';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsPerson } from 'react-icons/bs';
import { BiSearch } from 'react-icons/bi';
import { IoAdd } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [create, setCreate] = useState(true);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [color, setColor] = useState('');
  const [myAllTask, setMyAllTask] = useState([]);
  const [update, setUpdate] = useState('');
  const storage = localStorage.getItem('user');
  const user = JSON.parse(storage);
  const curDate = new Date().toDateString();

  const addNewTask = () => {
    setLoading(true);
    if (!title) {
      toast('Please add Title');
      return;
    }
    fetch('/addTask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        title,
        desc,
        deadlineDate,
        deadlineTime,
        color
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast(data.error);
        } else {
          toast('Task Added Successfully');
          setCreate(true);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const myTask = () => {
    fetch('/myTask', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setMyAllTask(data.allTask);
        }
      })
      .catch((err) => console.log(err));
  };
  const deleteTask = (itemId) => {
    setLoading(true);

    fetch(`/deleteTask/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate('updated');
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const doneTask = (itemId) => {
    setLoading(true);

    fetch(`/doneTask/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setUpdate('updated2');
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const Navbar = () => {
    return (
      <nav className="nav">
        <div className="left">
          <img
            src="https://ouch-cdn2.icons8.com/BEPd1UpyF4Y7G6i3kk99iK6b91D0zvHFExV1BNDNf6M/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvOTEv/ZGIyMGU2OTctOGVj/My00NzBkLWFkMzMt/ZjlhM2U0N2NkOTNi/LnBuZw.png"
            alt=""
            style={{
              width: '35px',
              height: '35px',
              borderRadius: '50%',
              objectFit: 'cover'
            }}
          />

          <p>
            Hi, <br />
            <span>{user.name}</span>
          </p>
        </div>
        <div className="right">
          <p>{curDate.replace(2023, '')}</p>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              localStorage.removeItem('token');
              window.location.reload();
            }}
          >
            LogOut
          </button>
        </div>
      </nav>
    );
  };

  const Footer = () => {
    return (
      <>
        <footer>
          <ul>
            <li>
              <GoHome
                onClick={() => {
                  setCreate(true);
                }}
              />
            </li>
            <li>
              <IoMdNotificationsOutline />
            </li>
            <li
              id="addTask"
              onClick={() => {
                setCreate((prev) => !prev);
              }}
            >
              {create ? <IoAdd /> : <IoClose />}
            </li>
            <li>
              <BsPerson />
            </li>
            <li>
              <BiSearch />
            </li>
          </ul>
        </footer>
      </>
    );
  };

  useEffect(() => {
    myTask();
  }, [create, update]);
  return (
    <>
      <Toaster />
      <div id="home">
        {loading ? <span class="loader"></span> : ''}
        <Navbar />
        {!create ? (
          <div className="create">
            <div className="create-new-task">
              <h1>Create New Task</h1>

              <div className="input">
                <p>Title</p>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => {
                    e.preventDefault();
                    setTitle(e.target.value);
                  }}
                  placeholder="User Research"
                />
              </div>

              <div className="input-time">
                <div className="input">
                  <p>Dead Line</p>
                  <input
                    type="date"
                    name="deadline"
                    value={deadlineDate}
                    onChange={(e) => setDeadlineDate(e.target.value)}
                  />
                  <input
                    type="time"
                    name="deadline"
                    value={deadlineTime}
                    onChange={(e) => setDeadlineTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="input">
                <p>Description</p>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  type="paragraph"
                  placeholder="Try this smart tool to better user research most important tasks"
                />
              </div>
              <div className="input">
                <p>Color</p>
                <select
                  name="color"
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  <option value="aqua" selected>
                    Select Color
                  </option>
                  <option value="orange">Orange</option>
                  <option value="darkmagenta">Dark Magenta</option>
                  <option value="lightgreen">Green</option>
                  <option value="blue">Blue</option>
                  <option value="skyblue">Sky Blue</option>
                  <option value="violet">Violet</option>
                  <option value="pink">Pink</option>
                </select>
              </div>
              <button onClick={() => addNewTask()}>ADD NEW TASK</button>
            </div>
          </div>
        ) : (
          ''
        )}
        <div className="home">
          <h2>Project</h2>
          <div className="projects">
            <div className="box box1">
              <img
                src="https://ouch-cdn2.icons8.com/LDSAAF3TEAI7ZzasYVqpXQZ1h7L221dyBzV6Fi14Ig0/rs:fit:256:180/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvOTE1/L2M4NTMxOWZhLWFj/MTQtNDU1Yi1iNWQx/LTk0MGI3NjRhODQx/NS5wbmc.png"
                alt=""
              />
            </div>
            <div className="box box2">
              <img
                src="https://ouch-cdn2.icons8.com/7KupNCeua3hOEIcCEs0zJSJmr5Qne_8G_Qcf8l1R3oU/rs:fit:256:231/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNTgz/L2JhYzgyOTRiLTNk/ZTItNGNhNy04MTQ0/LTkyNmUwMTFkYjVh/NC5wbmc.png"
                alt=""
              />
            </div>
            <div className="box box3">
              <img
                src="https://ouch-cdn2.icons8.com/GqY0sxICZXl4sLXcFLPyJl7JDVqwJ3q4OWVPJnlPTiA/rs:fit:256:317/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjIy/LzUzOWFjYmU3LTNk/MWItNGEyNS1iNDA0/LTZiMjU0N2IwMjUx/OS5wbmc.png"
                alt=""
              />
            </div>
            <div className="box box4">
              <img
                src="https://ouch-cdn2.icons8.com/xv0EzzuyvEE9-4Yt8d3Hrg2ifY-VxgffPDUoufuuMMs/rs:fit:256:307/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMzEv/ZGU1ZWQ1Y2MtOTEz/OC00MWQzLWJlZDYt/NTQzNDQyZGY4YTQ3/LnBuZw.png"
                alt=""
              />
            </div>
          </div>

          <div className="mid">
            <p>My Task</p>
            {myAllTask ? (
              myAllTask.map((item) => {
                return (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    {item.status === true ? (
                      <img
                        className="done"
                        src="https://ouch-cdn2.icons8.com/PI3ZOgwW8-4_HoavD0jqvEH68C5BjSxmHux6OrAcsYU/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNDU2/LzA5YjdhNzU2LWMx/YjktNGNhNy1hZTAw/LTM1YTJlMzZlODM1/ZS5wbmc.png"
                        alt=""
                      />
                    ) : (
                      ''
                    )}
                    <div
                      className="box myTaskBox"
                      style={{ backgroundColor: `${item.color}` }}
                    >
                      <img
                        onClick={() => deleteTask(item._id)}
                        className="delete"
                        src="https://ouch-cdn2.icons8.com/6KfapVnVQ6s1wG8KTftUb6htCH4lPDSwVQ3-hsTK9pI/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNDg0/LzhkOGM1Zjk2LThl/NTctNDEyMi05OTFl/LTFhOWVlZGI5ZGE3/ZS5wbmc.png"
                        alt=""
                      />
                      <h2>{item.title}</h2>
                      <p>{item.desc}</p>
                      <div className="doneStatus">
                        <img
                          onClick={() => doneTask(item._id)}
                          src="https://ouch-cdn2.icons8.com/GdnQSerF1ZE3hRATBkeHyJmiPKMzHKQmZITyxVO_wNE/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvMjM4/LzcyYmQ0Y2FiLTgw/ZTYtNDU0NC05M2Q5/LWRmNzZkM2U1ZmRk/NS5wbmc.png"
                          alt=""
                        />
                      </div>
                      <div className="time">
                        <span>
                          {item.deadlineDate} {item.deadlineTime}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <>
                <div className="box myTaskBox">
                  <h2>Here you will see your added Task</h2>
                  <img
                    className="newTaskEmoji"
                    src="https://ouch-cdn2.icons8.com/ULOoBxNtVn0u58tBZS6iesroRNtxEnYci8rlPuwxelk/rs:fit:256:256/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9wbmcvNjU1/L2U0OTE0YmY4LTIz/NmMtNDk2Yy1hNjBl/LTVkNjk3ZTM3YTM2/Ny5wbmc.png"
                    alt=""
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
