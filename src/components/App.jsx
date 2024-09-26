import { Children, useState, react, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import viteLogo from '/vite.svg';
import styles from './App.module.css';
import './App.module.css';
import clsx from 'clsx';
import Product from './product/Product';

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
