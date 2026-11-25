import "./Home.css";

export default function Home() {
  return (
    <div className="home-page container">
      <h1>Добро пожаловать в мое портфолио! </h1>
      <p>
        Этот проект демонстрирует навыки работы с React, TypeScript и API.
        Попробуйте переключить тему или узнать погоду в другом городе.
      </p>
      <div className="features">
        <div className="feature-card"> Смена тем</div>
        <div className="feature-card"> Адаптивность</div>
        <div className="feature-card"> Работа с API</div>
      </div>
    </div>
  );
}
