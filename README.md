# CRM [![Build Status](https://travis-ci.org/maxershov/webcrm.svg?branch=master)](https://travis-ci.org/maxershov/webcrm)

[Link to Docker Image](https://hub.docker.com/r/maxershov/crm)

Функции:
* Добавление/удаление/редактирование профилей
* Сортировка и поиск профилей по различным параметрам
* Учет депозитов на счетах клиентов/сотрудников
* Статистика с посещениями и событиями клиентов/сотрудников
* Создание 4-х типов профилей для постоянных клиентов/лидов/бывших клиентов/сотрудников
* Автоматический учет посещений со сканированием RFID карт 
* Календарь с заметками и списком посещений по датам
* Автоматический расчет оставшегося времени и посещений для абонементов 
* Мобильная версия 
* Ежедневное резервное копирование базы данных при запуске 

## Стек:
* Preact
* Redux, Redux Sage
* Knex.js
* SQLite
* Webpack
* Express
* PostCss

## Для начала работы:

Установите все зависимости:

```npm i```

Создайте пустую базу данных:

``` npm run createDb```

(cкопирует тестовую базу данных в папку ```Общие документы```(win) или ```Home```(Linux) )

Запустите приложение локально:

```npm run local```

Для запуска тестов

```npm test```
