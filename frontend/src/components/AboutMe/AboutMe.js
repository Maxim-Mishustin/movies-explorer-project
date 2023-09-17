import React from "react";
import avatar from "../../images/avatar.jpg";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="about-me__student">Студент</h2>
      <div className="about-me__block">
        <div className="about-me__text-block">
          <h3 className="about-me__name">Maksim Mishustin</h3>
          <h4 className="about-me__profession">Фронтенд-разработчик, 30 лет</h4>
          <p className="about-me__description">
            Я родился и живу в Воронеже, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href="https://github.com/maxim-mishustin"
            className="about-me__link"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
        <img
          src={avatar}
          alt="Фотография автора"
          className="about-me__avatar"
        />
      </div>
    </section>
  );
}

export default AboutMe;
