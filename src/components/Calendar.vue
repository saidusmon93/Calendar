<template>
  <div class="calendar">
    <div class="calendar__content">
      <div class="content__header">
        <div class="goMonth" @click="prev">&lt;</div>
        <div class="header__month">
          <h1>{{ currentMonth.format("MMMM") }}</h1>
        </div>
        <div class="goMonth" @click="next">&gt;</div>
      </div>
      <div class="calendar__select">
        <select name="year" id="year">
          <option>Выбрат</option>
        </select>
        <select name="month" id="month">
          <option>Выбрат</option>
        </select>
      </div>
      <table class="calendar_table" cellspacing="6">
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, index) in weeks" :key="index">
            <td
              v-for="day in week"
              :key="day.day"
              :class="getDayClasses(day)"
              @click="selectDay(day)"
            >
              {{ day.date.date() }}
            </td>
          </tr>
        </tbody>
      </table>
      <div class="save">
        <button>Сохранить</button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Calendar",
  data() {
    return {
      currentMonth: moment(),
      daysOfWeek: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
      weeks: [],
      selectedDay: null,
    };
  },
  methods: {
    selectDay(day) {
      this.selectedDay = day;
    },
    isToday(day) {
      return moment().isSame(day.date, "day");
    },
    isSelected(day) {
      return this.selectedDay && this.selectedDay.date.isSame(day.date, "day");
    },
    isMonth(day) {
      return !this.currentMonth.isSame(day.date, "month");
    },
    isSunday(day) {
      return day.date.day() === 0;
    },
    getDayClasses(day) {
      return {
        "is-today": this.isToday(day),
        "is-other-month": this.isMonth(day),
        "is-sunday": this.isSunday(day),
        selected: this.isSelected(day),
      };
    },
    prev() {
      this.currentMonth.subtract(1, "month");
      this.makeCalendar();
    },
    next() {
      this.currentMonth.add(1, "month");
      this.makeCalendar();
    },
    makeCalendar() {
      const weeks = [];
      const startMonth = this.currentMonth.clone().startOf("month");
      const endMonth = this.currentMonth.clone().endOf("month");
      const startDate = startMonth.clone().startOf("isoWeek");
      const endDate = endMonth.clone().endOf("isoWeek");
      let currentDate = startDate.clone();
      while (currentDate.isBefore(endDate)) {
        const week = [];
        for (let i = 0; i < 7; i++) {
          week.push({
            date: currentDate.clone(),
          });
          currentDate.add(1, "day");
        }
        weeks.push(week);
      }
      this.weeks = weeks;
    },
  },

  mounted() {
    this.makeCalendar();
  },
};
</script>
