import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setStep, setProgram, setSelectedActivities, setSelectedCoverage } from './store/formSlice';
import { RootState } from './store';
import data from './JSON/data.js';
import { Activity, Program, Country, AppData } from './interfaces/data.ts';
import InputRadio from "./components/InputRadio/InputRadio.tsx";
import { InputDate } from "./components/InputDate/InputDate.tsx";
import FormContainer from "./components/FormContainer/FormContainer.tsx";
import Heading from "./components/Heading/Heading.tsx";
import HeadSteps from "./components/HeadSteps/HeadSteps.tsx";
import HeadStepsButton from "./components/StepButton/StepButton.tsx";
import Select from "./components/Select/Select.tsx";
import Text from "./components/Text/Text.tsx";

function App() {
  const dispatch = useDispatch();
  const [countries, setCountries] = useState<Country[]>([])
  const [availablePrograms, setAvailablePrograms] = useState<Program[]>([]);
  const { country, program, coverageType, startDate, endDate, purpose, phone, activities } = useSelector((state: RootState) => state.form.formData);
  const step = useSelector((state: RootState) => state.form.step);

  useEffect(() => {
    const typedData = data as AppData;

    setCountries(typedData.countries);
  }, []);

  useEffect(() => {
    const typedData = data as AppData;
    if (country) {

      const selectedCountryData = typedData.countries.find(c => c.name === country);
      if (selectedCountryData) {
        const programIds = selectedCountryData.programs.map(p => p.id);
        const programs = typedData.programs.filter(p => programIds.includes(p.id));
        setAvailablePrograms(programs);
      } else {
        setAvailablePrograms([]);
      }
    } else {
      setAvailablePrograms([]);
    }
  }, [country]);


  const handleProgramSelect = (selectedProgram: string) => {
    dispatch(setProgram(selectedProgram));
  };

  const handleActivityChange = (activityId: string) => {
    dispatch(setSelectedActivities([activityId]));
  };

  const handleCoverageChange = (coverageType: string) => {
    dispatch(setSelectedCoverage([coverageType]));
  };


  const handleNext = () => {
    dispatch(setStep(1));
  };

  const handlePrev = () => {
    dispatch(setStep(-1));
  };


  const handleSubmit = async () => {
    const dataToSend = {
      country,
      program,
      coverageType,
      startDate,
      endDate,
      purpose,
      phone,
      activities
    };
    console.log(dataToSend);
  };

  const handleStartDateChange = (date: string | null) => {
    dispatch(setFormData({ startDate: date }));
  };

  const handleEndDateChange = (date: string | null) => {
    dispatch(setFormData({ endDate: date }));
  };

  return (
    <div className="main-wrapper">
      <FormContainer>
        <HeadSteps currentStep={step}></HeadSteps>
        <HeadStepsButton count={step} onClick={handlePrev} />

        {step === 0 && <form>
          <Heading>Покупка страхового полиса</Heading>
          <Text>Страна путешествия</Text>
          <label className="form-label" htmlFor="country">
            <Select countries={countries} id="country"></Select>
          </label>
          <Text>Тип покрытия</Text>

          <InputRadio
            name="coverages"
            value='once'
            checked={coverageType !== undefined ? coverageType.includes('once') : false}
            onChange={() => handleCoverageChange('once')}
          >
            <Text appearence='small'>Однократное путешествие</Text>
          </InputRadio>

          <InputRadio
            name="activities"
            value='more'
            checked={coverageType !== undefined ? coverageType.includes('more') : false}
            onChange={() => handleCoverageChange('more')}
          >
            <Text appearence='small'>Многократное путешествие</Text>
          </InputRadio>

          <Text>Начало страхования</Text>
          <InputDate
            dateType="start"
            dateValue={startDate}
            onChange={handleStartDateChange}
          />

          <Text>Конец страхования</Text>
          <InputDate
            dateType="end"
            dateValue={endDate}
            onChange={handleEndDateChange}
          />

          <div className="radios-wrapper">
            {data.activities && data.activities.map((elem: Activity) => (

              <InputRadio
                key={elem.id}
                name="activities"
                value={elem.id}
                checked={activities !== undefined ? activities.includes(elem.name) : false}
                onChange={() => handleActivityChange(elem.name)}
              >
                <Text appearence='small'>{elem.name}</Text>
              </InputRadio>

            ))}
          </div>

          <Text>Номер мобильного телефона</Text>

          <button type="button" onClick={handleNext}>Далее</button>
        </form>}

        {step === 1 && (
          <form>
            <Heading>Выберите программу</Heading>
            {availablePrograms.length > 0 ? (
              <ul>
                {availablePrograms.map(program => (
                  <li key={program.id}>
                    <button type="button" onClick={() => handleProgramSelect(program.name)}>
                      {program.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет доступных программ для выбранной страны.</p>
            )}

            <button type="button" onClick={handleNext}>Далее</button>
          </form>
        )}

        {step === 2 && (
          <form>
            <Heading>Подтверждение данных</Heading>
            <p>Страна: {country}</p>
            <p>Программа: {program || 'Не выбрано'}</p>
            <p>Начало страхования: {startDate}</p>
            <p>Конец страхования: {endDate}</p>
            <button type="button" onClick={handleSubmit}>Отправить</button>
          </form>
        )}
        <HeadStepsButton count={step} onClick={handlePrev} />

      </FormContainer>
    </div>
  );
}

export default App;