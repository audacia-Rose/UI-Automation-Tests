export default class FormSelectors {
  static readonly NameField = '.font-sans.text-base.field-outline.w-full';
  static readonly SelectMonths = '.datepicker-dropdown__title > :nth-child(1)';
  static readonly SelectYears = '.datepicker-dropdown__title > :nth-child(2)';
  static ChooseMonth(monthNumber: number): string {return `.datepicker-dropdown__3-4-grid > :nth-child(${monthNumber})`}

  static readonly DayOfMonth = '';
  
}
