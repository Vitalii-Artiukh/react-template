import {
  Children,
  useState,
  react,
  useEffect,
  Component,
  useId,
  useMemo,
  useRef,
  forwardRef,
  createContext,
} from 'react';
import reactLogo from '../assets/react.svg';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import axios from 'axios';
import styles from './App.module.css';
import './App.module.css';
import clsx from 'clsx';
import Product from './product/Product';
import taskItem from './task.json';
import { object } from 'prop-types';
import ArticleList from './ArticleList/ArticleList';
import { fetchArticlesWithTopic } from './articles-api';
import { SearchForm } from './SearchForm/SearchForm';

///////////////////  Хук useRef  //////////////////

const Player = ({ source }) => {
  const playerRef = useRef();

  const play = () => playerRef.current.play();
  const pause = () => playerRef.current.pause();

  return (
    <div>
      <video src={source} ref={playerRef}>
        Sorry, your browser does not support embedded videos.
      </video>
      <div>
        <button onClick={play}>Play</button>
        <button onClick={pause}>Pause</button>
      </div>
    </div>
  );
};

const CustomButton = forwardRef((props, ref) => (
  <button ref={ref}>{props.children}</button>
));

const App = () => {
  const btnRef = useRef();

  useEffect(() => btnRef.current.focus(), []);

  return (
    <>
      <CustomButton ref={btnRef}>Button with forwarded ref</CustomButton>
      <Player source="http://media.w3.org/2010/05/sintel/trailer.mp4" />;
    </>
  );
};

////////////////////////
// const App = () => {
//   const valueRef = useRef(0);

//   useEffect(() => {
//     // Виконається лише один раз під час монтування.
//     // Наступні оновлення значення рефа не
//     // викличуть оновлення компонента
//     console.log(valueRef.current);
//   });

//   const handleClick = () => {
//     valueRef.current += 1;
//   };
//   console.log(valueRef.current);

//   return <button onClick={handleClick}>Click to update ref value</button>;
// };

//////////////////////////////////
// const App = () => {
//   const [value, setValue] = useState(0);
//   const btnRef = useRef();

//   // Буде undefined на першому рендері
//   // і посиланням на DOM-елемент всі наступні
//   console.log('App: ', btnRef.current);

//   useEffect(() => {
//     // Ефект виконується після монтування,
//     // тому завжди буде посиланням на DOM-елемент
//     console.log('useEffect: ', btnRef.current);
//   });

//   const handleClick = () => {
//     // Кліки будуть після монтування,
//     // тому завжди буде посиланням на DOM-елемент
//     console.log('handleClick: ', btnRef.current);
//   };

//   return (
//     <>
//       <button onClick={() => setValue(value + 1)}>
//         Update value to trigger re-render
//       </button>
//       <button ref={btnRef} onClick={handleClick}>
//         Button with ref
//       </button>
//     </>
//   );
// };

////////////////////  Хук useMemo  //////////////////////
// const App = () => {
//   const [planets, setPlanets] = useState(['Earth', 'Mars', 'Jupiter', 'Venus']);
//   const [query, setQuery] = useState('');
//   const [clicks, setClicks] = useState(0);

//   const filteredPlanets = useMemo(
//     () => planets.filter(planet => planet.includes(query)),
//     [planets, query]
//   );

//   return (
//     <>
//       <button onClick={() => setClicks(clicks + 1)}>
//         Number of clicks: {clicks}
//       </button>
//       <ul>
//         {filteredPlanets.map(planet => (
//           <li key={planet}>{planet}</li>
//         ))}
//       </ul>
//     </>
//   );
// };
///////////////  HTTP-запити  /////////////////////////

// export const App = () => {
//   const [articles, setArticles] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const handleSearch = async topic => {
//     try {
//       setLoading(true);
//       setError(false);
//       setArticles([]);

//       const data = await fetchArticlesWithTopic(topic);
//       setArticles(data);
//     } catch (error) {
//       setError(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h1>Latest articles</h1>

//       <SearchForm onSearch={handleSearch} />

//       {loading && <p>Loading data, please wait...</p>}
//       {error && (
//         <p>Whoops, something went wrong! Please try reloading this page!</p>
//       )}
//       {articles && <ArticleList items={articles} />}
//     </div>
//   );
// };

/////////////////////  Formik  ///////////////////////////

// const FeedbackSchema = Yup.object().shape({
//   username: Yup.string()
//     .min(2, 'Too Short!')
//     .max(50, 'Too Long!')
//     .required('Required'),
//   email: Yup.string().email('Must be valid email!').required('Required'),
//   message: Yup.string()
//     .min(3, 'Too short')
//     .max(256, 'Too long')
//     .required('Required'),
//   level: Yup.string().oneOf(['good', 'neutral', 'bad']).required('Required'),
// });

// const initialValues = {
//   username: '',
//   email: '',
//   message: '',
//   level: 'good',
// };

// const FeedbackForm = () => {
//   const nameFieldId = useId();
//   const emailFieldId = useId();
//   const msgFieldId = useId();
//   const levelFieldId = useId();

//   const handleSubmit = (values, actions) => {
//     console.log(values);
//     actions.resetForm();
//   };

//   return (
//     <Formik
//       initialValues={initialValues}
//       onSubmit={handleSubmit}
//       validationSchema={FeedbackSchema}
//     >
//       <Form>
//         <label htmlFor={nameFieldId}>Username</label>
//         <Field type="text" name="username" id={nameFieldId} />
//         <ErrorMessage name="username" component="span" />

//         <label htmlFor={emailFieldId}>Email</label>
//         <Field type="email" name="email" id={emailFieldId} />
//         <ErrorMessage name="email" component="span" />

//         <label htmlFor={msgFieldId}>Message</label>
//         <Field as="textarea" name="message" id={msgFieldId} rows="5" />
//         <ErrorMessage name="message" component="span" />

//         <label htmlFor={levelFieldId}>Service satisfaction level</label>
//         <Field as="select" name="level" id={levelFieldId}>
//           <option value="good">Good</option>
//           <option value="neutral">Neutral</option>
//           <option value="bad">Bad</option>
//         </Field>
//         <ErrorMessage name="level" component="span" />

//         <button type="submit">Submit</button>
//       </Form>
//     </Formik>
//   );
// };

// export const App = () => {
//   return (
//     <div>
//       <FeedbackForm />
//     </div>
//   );
// };

/////////////////  колекція елементів  ///////////////////////

// const Task = ({ data: { id, text }, onDelete }) => {
//   return (
//     <div>
//       <p>{text}</p>
//       <button onClick={() => onDelete(id)}>Delete</button>
//     </div>
//   );
// };

// const TaskList = ({ onDelete, tasks }) => {
//   return (
//     <ul>
//       {tasks.map(task => (
//         <li key={task.id}>
//           <Task data={task} onDelete={onDelete} />
//         </li>
//       ))}
//     </ul>
//   );
// };

// const Filter = ({ value, onFilter }) => {
//   return (
//     <div>
//       <p>Search by name</p>
//       <input
//         type="text"
//         value={value}
//         onChange={event => onFilter(event.target.value)}
//       />
//     </div>
//   );
// };

// const Form = ({ onAdd }) => {
//   const handleSubmit = event => {
//     event.preventDefault();

//     onAdd({
//       id: Date.now(),
//       text: event.target.elements.text.value,
//     });
//     event.target.reset();
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="text" name="text" />
//       <button type="submit">Add task</button>
//     </form>
//   );
// };

// const App = () => {
//   const [tasks, setTasks] = useState(taskItem);
//   const [filter, setFilter] = useState('');

//   const addTask = newTask => {
//     setTasks(prevTasks => {
//       return [...prevTasks, newTask];
//     });
//   };

//   const deleteTask = taskId => {
//     setTasks(prevTasks => {
//       return prevTasks.filter(task => task.id !== taskId);
//     });
//   };

//   const visibleTasks = tasks.filter(task =>
//     task.text.toLowerCase().includes(filter.toLowerCase())
//   );

//   return (
//     <div>
//       <Form onAdd={addTask} />
//       <Filter value={filter} onFilter={setFilter} />
//       <TaskList onDelete={deleteTask} tasks={visibleTasks} />
//     </div>
//   );
// };

/////////////////  Form  ///////////////////////

// const SearchBar = () => {
//   const [inputValue, setInputValue] = useState('');

//   const handleChange = event => {
//     setInputValue(event.target.value);
//   };

//   return (
//     <div>
//       <input type="text" value={inputValue} onChange={handleChange} />
//       <p>{inputValue}</p>
//     </div>
//   );
// };

// /////

// // const LoginForm = ({ onLogin }) => {
// //   const handleSubmit = event => {
// //     event.preventDefault();

// //     const form = event.target;
// //     const { login, password } = form.elements;

// //     onLogin({
// //       login: login.value,
// //       password: password.value,
// //     });

// //     form.reset();
// //   };

// //   const loginId = useId();
// //   const passwordId = useId();

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <label htmlFor={loginId}>Login</label>
// //       <input type="text" name="login" id={loginId} />
// //       <label htmlFor={passwordId}>Password</label>
// //       <input type="password" name="password" id={passwordId} />
// //       <button type="submit">Login</button>
// //     </form>
// //   );
// // };

// /////

// const LangSwitcher = ({ value, onSelect }) => {
//   const selectId = useId();

//   return (
//     <div>
//       <label htmlFor={selectId}>Choose language</label>
//       <select
//         id={selectId}
//         value={value}
//         onChange={event => onSelect(event.target.value)}
//       >
//         <option value="en">English</option>
//         <option value="uk">Ukrainian</option>
//         <option value="pl">Polish</option>
//       </select>
//     </div>
//   );
// };

// /////      контрольована форма

// const ControlLoginForm = () => {
//   const [values, setValues] = useState({ login: '', password: '' });

//   //   const handleLoginChange = event => {
//   //     setValues({ ...values, login: event.target.value });
//   //   };

//   //   const handlePwdChange = event => {
//   //     setValues({ ...values, password: event.target.value });
//   //   };

//   const handleChange = event => {
//     setValues({ ...values, [event.target.name]: event.target.value });
//   };

//   const handleSubmit = event => {
//     event.preventDefault();

//     console.log(values.login, values.password);

//     setValues({ login: '', password: '' });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="login"
//         value={values.login}
//         onChange={handleChange}
//       />
//       <input
//         type="password"
//         name="password"
//         value={values.password}
//         onChange={handleChange}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// const App = () => {
//   const [lang, setLang] = useState('uk');
//   const [coffeeSize, setCoffeeSize] = useState('sm');
//   const [hasAccepted, setHasAccepted] = useState(false);

//   //   const handleLogin = userData => {
//   //     console.log(userData);
//   //   };

//   const handleSizeChange = event => {
//     setCoffeeSize(event.target.value);
//   };

//   const handleChange = event => {
//     setHasAccepted(event.target.checked);
//   };

//   return (
//     <div>
//       <>
//         <ControlLoginForm />
//       </>
//       <>
//         <label htmlFor="">
//           <input
//             type="checkbox"
//             name="terms"
//             checked={hasAccepted}
//             onChange={handleChange}
//           />
//           I accept terms and conditions
//         </label>
//         <button type="button" disabled={!hasAccepted}>
//           Proceed
//         </button>
//       </>
//       <>
//         <h2>Select coffee size</h2>
//         <label htmlFor="">
//           <input
//             type="radio"
//             name="coffeeSize"
//             value="sm"
//             checked={coffeeSize === 'sm'}
//             onChange={handleSizeChange}
//           />
//           Small
//         </label>
//         <label htmlFor="">
//           <input
//             type="radio"
//             name="coffeeSize"
//             value="md"
//             checked={coffeeSize === 'md'}
//             onChange={handleSizeChange}
//           />
//           Medium
//         </label>
//         <label htmlFor="">
//           <input
//             type="radio"
//             name="coffeeSize"
//             value="lg"
//             checked={coffeeSize === 'lg'}
//             onChange={handleSizeChange}
//           />
//           Large
//         </label>
//       </>
//       <p>Selected language: {lang}</p>
//       <LangSwitcher value={lang} onSelect={setLang} />
//       <SearchBar />
//       {/* <LoginForm onLogin={handleLogin} /> */}
//     </div>
//   );
// };

//////////////////////////////////////////////////
// import { Fragment } from 'react';

// const poem = {
//   lines: [
//     'I write, erase, rewrite',
//     'Erase again, and then',
//     'A poppy blooms.',
//   ],
// };

// function App() {
//   return (
//     <article>
//       {poem.lines.map((line, i) => (
//         <Fragment key={i}>
//           {i > 0 && <hr />}
//           <p>{line}</p>
//         </Fragment>
//       ))}
//     </article>
//   );
// }

////////////////////////////////////////////////

// const recipes = [
//   {
//     id: 'greek-salad',
//     name: 'Greek Salad',
//     ingredients: ['tomatoes', 'cucumber', 'onion', 'olives', 'feta'],
//   },
//   {
//     id: 'hawaiian-pizza',
//     name: 'Hawaiian Pizza',
//     ingredients: [
//       'pizza crust',
//       'pizza sauce',
//       'mozzarella',
//       'ham',
//       'pineapple',
//     ],
//   },
//   {
//     id: 'hummus',
//     name: 'Hummus',
//     ingredients: ['chickpeas', 'olive oil', 'garlic cloves', 'lemon', 'tahini'],
//   },
// ];

// function Reciep({ id, name, ingredients }) {
//   return (
//     <div>
//       <h2>{name}</h2>
//       <ul>
//         {ingredients.map(ingredient => (
//           <li key={ingredient}>{ingredient}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// function App() {
//   return (
//     <div>
//       <h1>Recipes</h1>
//       {recipes.map(reciep => (
//         <Reciep {...reciep} key={reciep.id} />
//       ))}
//     </div>
//   );
// }
////////
// function App() {
//   return (
//     <div>
//       <h1>Recipes</h1>
//       <ul>
//         {recipes.map(rec => (
//           <li key={rec.id}>
//             <h2>{rec.name}</h2>
//             <ul>
//               {rec.ingredients.map(i => (
//                 <li key={i}>{i}</li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

///////////////////  Робота з LocalStorage  ////////////////
// const App = () => {
/////////  Але є ще одна форма запису useState з функцією.
// const [] = useState(() => {
// 	return 0;
// });

// const [clicks, setClicks] = useState(() => {
//   const savedClicks = window.localStorage.getItem('saved-clicks');

/////// Якщо там щось є, повертаємо це
/////// значення як початкове значення стану
// if (savedClicks !== null) {
////////  Обовязково парсимо  return JSON.parse(savedObject);
////////  Або призводимо до: Number, Bull.
//   return Number(savedClicks);
// }

////////////// У протилежному випадку повертаємо
//////////// яке-небудь значення за замовчуванням
//   return 0;
// });

// useEffect(() => {
///////////////////  Запис  //////////////////
//   window.localStorage.setItem('saved-clicks', clicks);
// }, [clicks]);

//   return (
//     <div>
//       <button onClick={() => setClicks(clicks + 1)}>
//         You clicked {clicks} times
//       </button>
//       <button onClick={() => setClicks(0)}>Reset</button>
//     </div>
//   );
// };

// Якщо ви працюєте із складними типами даних,
// такими як об'єкт чи масив, не забувайте перетворити
// збережене значення у рядок за допомогою JSON.stringify.

//!!! window.localStorage.setItem("key", JSON.stringify({}));

/////////////////  Декілька ефектів  //////////////////////
// const App = () => {
//   const [first, setFirst] = useState(0);
//   const [second, setSecond] = useState(0);

//   useEffect(() => {
//     console.log('First updated: ', first);
//   }, [first]);

//   useEffect(() => {
//     console.log('Second updated: ', second);
//   }, [second]);

//   useEffect(() => {
//     console.log('First or second updated: ', first + second);
//   }, [first, second]);

//   return (
//     <>
//       <button onClick={() => setFirst(first + 1)}>First: {first}</button>
//       <button onClick={() => setSecond(second + 1)}>First: {second}</button>
//     </>
//   );
// };

//////////////////////  Етап оновлення  /////////////////////

// const App = () => {
//   const [clicks, setClicks] = useState(0);

//   // ❌ Ефект записаний з помилкою!
//   useEffect(() => {
//     console.log('Clicks updated: ', clicks);
//   }, [clicks]);

//   return (
//     <button onClick={() => setClicks(clicks + 1)}>
//       You clicked {clicks} times
//     </button>
//   );
// };

///////////////////  Розмонтування та очищення  //////////////////////
// const Modal = () => {
//   useEffect(() => {
//     // Зберігаємо ідентифікатор інтервалу в змінну
//     const intervalId = setInterval(() => {
//       console.log(`Interval - ${Date.now()}`);
//     }, 2000);
//     return () => {
//       // Очищаємо інтервал за його ідентифікатором
//       clearInterval(intervalId);
//     };
//   }, []);

//   return <div>App</div>;
// };

// const App = () => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div>
//       <button onClick={() => setIsOpen(!isOpen)}>
//         {isOpen ? 'Close' : 'Open'}{' '}
//       </button>
//       {isOpen && <Modal />}
//     </div>
//   );
// };

///////////////////////  useEffect  ///////////////////////
// const App = () => {
//   const [clicks, setClicks] = useState(0);

//   // Оголошуємо ефект
//   useEffect(() => {
//     document.title = `You clicked ${clicks} times`;
//   });

//   return (
//     <button onClick={() => setClicks(clicks + 1)}>
//       You clicked {clicks} times
//     </button>
//   );
// };

/////////////////  useEffect з порожнім масивом  ////////////
// const App = () => {
//   const [clicks, setClicks] = useState(0);

//   useEffect(() => {
//     console.log('You can see me only once!');
//   }, []);

//   return (
//     <button onClick={() => setClicks(clicks + 1)}>
//       You clicked {clicks} times
//     </button>
//   );
// };

////////////////////////  завдання 1  ///////////////////////
// export const people = [
//   {
//     id: 0,
//     name: 'Creola Katherine Johnson',
//     profession: 'mathematician',
//     accomplishment: 'spaceflight calculations',
//     imageId: 'MK3eW3A',
//   },
//   {
//     id: 1,
//     name: 'Mario José Molina-Pasquel Henríquez',
//     profession: 'chemist',
//     accomplishment: 'discovery of Arctic ozone hole',
//     imageId: 'mynHUSa',
//   },
//   {
//     id: 2,
//     name: 'Mohammad Abdus Salam',
//     profession: 'physicist',
//     accomplishment: 'electromagnetism theory',
//     imageId: 'bE7W1ji',
//   },
//   {
//     id: 3,
//     name: 'Percy Lavon Julian',
//     profession: 'chemist',
//     accomplishment:
//       'pioneering cortisone drugs, steroids and birth control pills',
//     imageId: 'IOjWm71',
//   },
//   {
//     id: 4,
//     name: 'Subrahmanyan Chandrasekhar',
//     profession: 'astrophysicist',
//     accomplishment: 'white dwarf star mass calculations',
//     imageId: 'lrWQx8l',
//   },
// ];

// export function getImageUrl(person) {
//   return 'https://i.imgur.com/' + person.imageId + 's.jpg';
// }

// function App() {
//   const listItemsChemist = people
//     .filter(piple => piple.profession === 'chemist')
//     .map(person => (
//       <li key={person.id}>
//         <img src={getImageUrl(person)} alt={person.name} />
//         <p>
//           <b>{person.name}:</b>
//           {' ' + person.profession + ' '}
//           known for {person.accomplishment}
//         </p>
//       </li>
//     ));
//   const listItemsOther = people
//     .filter(piple => piple.profession !== 'chemist')
//     .map(person => (
//       <li key={person.id}>
//         <img src={getImageUrl(person)} alt={person.name} />
//         <p>
//           <b>{person.name}:</b>
//           {' ' + person.profession + ' '}
//           known for {person.accomplishment}
//         </p>
//       </li>
//     ));
//   return (
//     <article>
//       <h1>Scientists</h1>
//       <ul>{listItemsChemist}</ul>
//       <ul>{listItemsOther}</ul>
//     </article>
//   );
// }

////////////////  Оновлення об'єктів  ///////////////////////
// const App = () => {
//   const [values, setValues] = useState({
//     x: 0,
//     y: 0,
//   });

//   const updateX = () => {
//     setValues({ ...values, x: values.x + 1 });
//   };

//   const updateY = () => {
//     setValues({ ...values, y: values.y + 1 });
//   };

//   return (
//     <div>
//       <p>
//         x: {values.x}, y: {values.y}
//       </p>

//       <button onClick={updateX}>Update x</button>
//       <button onClick={updateY}>Update y</button>
//     </div>
//   );
// };

//////  Підняття стану // передача стану до спільного батька  /////////////
// const ClickCounter = ({ value, onUpdate }) => {
//   return <button onClick={onUpdate}>Current: {value}</button>;
// };

// const App = () => {
//   const [clicks, setClicks] = useState(0);

//   const handleClick = () => {
//     setClicks(clicks + 1);
//   };

//   return (
//     <>
//       <ClickCounter value={clicks} onUpdate={handleClick} />
//       <ClickCounter value={clicks} onUpdate={handleClick} />
//       <ClickCounter value={clicks} onUpdate={handleClick} />
//     </>
//   );
// };

/////////////////////////  Ізоляція стану /////////////////////////
// const ClickCounter = () => {
//   const [clicks, setClicks] = useState(0);

//   const handleClick = () => {
//     setClicks(clicks + 1);
//   };

//   return <button onClick={handleClick}>Current: {clicks}</button>;
// };

// const App = () => {
//   return (
//     <>
//       <ClickCounter />
//       <ClickCounter />
//       <ClickCounter />
//     </>
//   );
// };

////////////////  Реактивність, оновлення на події  ////////////////////////
// const App = () => {
//   const [clicks, setClicks] = useState(0);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = () => {
//     setClicks(clicks + 1);
//   };

//   const handleToggle = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <>
//       <button onClick={handleClick}>Current: {clicks}</button>;
//       <button onClick={handleToggle}>{isOpen ? 'Hide' : 'Show'} </button>
//       {isOpen && <p>Now you can see me!</p>}
//     </>
//   );
// };

//////////////////////////////  read props  /////////////////////////////////////

// const CustomButton = ({ message, children }) => {
//   return <button onClick={() => alert(message)}>{children}</button>;
// };

// const App = () => {
//   return (
//     <>
//       <CustomButton message="Playing music!">Play some music</CustomButton>
//       <CustomButton message="Uploading your data!">Upload data</CustomButton>
//     </>
//   );
// };

///////////////////////////  onClick  &  evt  ///////////////////////////////////
// const App = () => {
//   const handleClick = evt => {
//     console.log(evt);
//   };

//   return (
//     <>
//       <button onClick={handleClick}>First button!</button>
//       <button onClick={evt => console.log(evt)}>Second button!</button>
//     </>
//   );

// const handleClick = () => {
//   alert("I'm a button!");
// };
// return <button onClick={handleClick}>Click me!</button>;

// return <button onClick={() => alert("I'm a button!")}>Click mi!</button>;
// };

////////////////////  for Product  ////////////////////////////////

// const App = props => {
//   return (
//     <div>
//       <h1 className={clsx(styles.title)}>Best selling</h1>

//       <Product
//         name="Tacos With Lime"
//         imgUrl="https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?dpr=2&h=480&w=640"
//         price={10.99}
//       />
//       <Product
//         name="Fries and Burger"
//         imgUrl="https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?dpr=2&h=480&w=640"
//         price={14.29}
//       />
//     </div>
//   );
// };
///////////////////////////////////////////////////

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App

// function Product() {
//   return (
//     <div>
//       <h2>Cookies</h2>
// 	  <p>Price: 999 credits</p>
//     </div>
//   );
// };

export default App;
