// src/pages/About.tsx
import "./About.css";

// Обязательно добавь "export default" перед function
export default function About() {
  return (
    <div className="container about-page">
      <h1>О проекте</h1>
      <p>Это мое портфолио на React.</p>
      <p>Здесь реализована смена тем, адаптивность и работа с API погоды.</p>
    </div>
  );
}
