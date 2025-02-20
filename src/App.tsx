import { useDispatch, useSelector } from 'react-redux';
import { setFormData, setStep } from './store/formSlice';
import { RootState } from './store';
import { Activity, Country } from './interfaces/data.ts';
import { FormData } from './interfaces/Form.ts';
import data from './JSON/data.json';
import InputRadio from "./components/InputRadio/InputRadio.tsx";
import { InputDate } from "./components/InputDate/InputDate.tsx";
import FormContainer from "./components/FormContainer/FormContainer.tsx";
import Heading from "./components/Heading/Heading.tsx";
import HeadSteps from "./components/HeadSteps/HeadSteps.tsx";
import HeadStepsButton from "./components/StepButton/StepButton.tsx";
import Select from "./components/Select/Select.tsx";
import Text from "./components/Text/Text.tsx";
import InputTel from './components/InputTel/InputTel.tsx';
import FormButton from './components/FormButton/FormButton.tsx';
import Clue from './components/Clue/Clue.tsx';
import useFormValidation from './hooks/useFormValidation.ts';
import usePrograms from './hooks/usePrograms.ts';

function App() {
  const dispatch = useDispatch();
  const { country, program, coverageType, startDate, endDate, phone, activities } = useSelector((state: RootState) => state.form.formData);
  const FormDataState: FormData = useSelector((state: RootState) => state.form.formData);
  const step = useSelector((state: RootState) => state.form.step);

  const { errors, validate, clearError } = useFormValidation(FormDataState, { step });
  const countryObject: Country | undefined = data.countries.find(c => c.name === country);
  const availablePrograms = usePrograms(countryObject);

  const handleProgramSelect = (selectedProgram: string) => {
    dispatch(setFormData({ program: selectedProgram }));
    clearError('program');
  };

  const selectedProgram = useSelector((state: RootState) => state.form.formData.program);

  const handleNext = () => {
    const isValid = validate();
    if (isValid) {
      dispatch(setStep(1));
    }
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
      phone,
      activities
    };
    console.log(dataToSend);
  };

  const handleActivityChange = (activityId: string) => {
    dispatch(setFormData({ activities: [activityId] }));
    clearError('activities');
  };

  const handlePhoneChange = (phone: string) => {
    console.log("handlePhoneChange, phone:", phone);
    dispatch(setFormData({ phone: phone }));
    if (phone.length >= 10) {
      clearError('phone');
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    dispatch(setFormData({ country: selectedCountry }));
    clearError('country');
  };

  const handleCoverageChange = (coverageType: string) => {
    dispatch(setFormData({ coverageType: [coverageType] }));
    clearError('coverageType');
  };

  const handleStartDateChange = (date: string | null) => {
    dispatch(setFormData({ startDate: date }));
    clearError('startDate');
  };

  const handleEndDateChange = (date: string | null) => {
    dispatch(setFormData({ endDate: date }));

    clearError('endDate');
  };



  return (
    <div className="main-wrapper">
      <FormContainer>
        <HeadSteps currentStep={step}></HeadSteps>
        <HeadStepsButton count={step} onClick={handlePrev} />

        {step === 0 && <>
          <Heading>Покупка страхового полиса</Heading>
          <Text>
            Страна путешествия
            <Clue dataSet='Подсказка' />
          </Text>
          <label className="form-label" htmlFor="country">
            <Select
              countries={data.countries}
              id="country"
              onChange={handleCountryChange}
            />
            <span className={`error-message ${errors.country ? 'active' : ''}`}>{errors.country}</span>
          </label>
          <Text>
            Тип покрытия
            <Clue dataSet='Подсказка 2' />
          </Text>

          <InputRadio
            name="coverages"
            value='once'
            checked={coverageType.includes('once')}
            onChange={() => handleCoverageChange('once')}
          >
            <Text appearence='small'>Однократное путешествие</Text>
          </InputRadio>

          <InputRadio
            name="coverages"
            value='more'
            checked={coverageType.includes('more')}
            onChange={() => handleCoverageChange('more')}
          >
            <Text appearence='small'>Многократное путешествие</Text>
          </InputRadio>

          <span className={`error-message ${errors.coverageType ? 'active' : ''}`}>{errors.coverageType}</span>


          <Text>
            Начало страхования
            <Clue dataSet='Подсказка 3' />
          </Text>
          <InputDate
            dateType="start"
            dateValue={startDate}
            onChange={handleStartDateChange}
          />
          <span className={`error-message ${errors.startDate ? 'active' : ''}`}>{errors.startDate}</span>

          <Text>
            Конец страхования
            <Clue dataSet='Подсказка 4' />
          </Text>
          <InputDate
            dateType="end"
            dateValue={endDate}
            onChange={handleEndDateChange}
          />
          <span className={`error-message ${errors.endDate ? 'active' : ''}`}>{errors.endDate}</span>


          <div className="radios-wrapper">
            {data.activities && data.activities.map((elem: Activity) => (

              <InputRadio
                key={elem.id}
                name="activities"
                value={elem.id}
                checked={activities !== undefined ? activities.includes(elem.id) : false}
                onChange={() => handleActivityChange(elem.id)}
              >
                <Text appearence='small'>{elem.name}</Text>
              </InputRadio>

            ))}

            <Clue dataSet='Подсказка 5' />
            <span className={`error-message ${errors.activities ? 'active' : ''}`}>{errors.activities}</span>

          </div>

          <Text>
            Номер мобильного телефона
            <Clue dataSet='Подсказка 6' />
          </Text>

          <InputTel
            placeholder="Enter your number"
            value={phone || ''}
            onChange={handlePhoneChange}
          />
          <span className={`error-message ${errors.phone ? 'active' : ''}`}>{errors.phone}</span>


          <FormButton appearence='small' type="button" onClick={handleNext}>Далее</FormButton>
        </>}

        {step === 1 && (
          <>
            <Heading>Выберите программу</Heading>
            {availablePrograms.length > 0 ? (
              <>
                {availablePrograms.map((programItem) => (
                  <InputRadio
                    appearence='big'
                    key={programItem.id}
                    name="program"
                    value={programItem.name}
                    checked={selectedProgram === programItem.name}
                    onChange={() => handleProgramSelect(programItem.name)}
                  >
                    <span>{programItem.name}</span>
                    <b>Общее покрытие - 20 000 EUR</b>
                    <Text appearence='small'>Медицинское лучение, репатриация и другое </Text>
                  </InputRadio>
                ))}

              </>
            ) : (
              <p>Нет доступных программ для выбранной страны.</p>
            )}
            <span className={`error-message ${errors.program ? 'active' : ''}`}>{errors.program}</span>

            <FormButton type="button" appearence='big' onClick={handleNext}>
              <span>Выбрать Gold</span>
              <span>UZS 173.231</span>
            </FormButton>
          </>
        )}

        {step === 2 && (
          <>
            <Heading>Подтверждение данных</Heading>
            <p><strong>Страна: </strong>{country}</p>
            <p><strong>Тип покрытия: </strong>{coverageType.includes('more') ? 'Многократное путешествие' : 'однократное путешествие'}</p>
            <p><strong>Цель: </strong>{activities}</p>
            <p><strong>Программа: </strong>{program}</p>
            <p><strong>Начало страхования: </strong>{startDate}</p>
            <p><strong>Конец страхования: </strong>{endDate}</p>
            <p><strong>Телефон: </strong>{phone}</p>

            <FormButton type="button" onClick={handleSubmit}>Отправить</FormButton>
          </>
        )

        }
        <HeadStepsButton count={step} onClick={handlePrev} />
        <Text appearence='small'>
          <span className='attention'>
            <svg width="2" height="7" viewBox="0 0 2 7" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.64205 0.181818L1.56818 4.3267H0.78125L0.707386 0.181818H1.64205ZM1.17614 6.05398C1.01894 6.05398 0.88447 5.99905 0.772727 5.8892C0.660985 5.77746 0.606061 5.64299 0.607955 5.4858C0.606061 5.33049 0.660985 5.19792 0.772727 5.08807C0.88447 4.97633 1.01894 4.92045 1.17614 4.92045C1.32955 4.92045 1.46212 4.97633 1.57386 5.08807C1.68561 5.19792 1.74242 5.33049 1.74432 5.4858C1.74242 5.58996 1.71496 5.68561 1.66193 5.77273C1.6108 5.85795 1.54261 5.92614 1.45739 5.97727C1.37216 6.02841 1.27841 6.05398 1.17614 6.05398Z" fill="white" />
            </svg>
          </span>
          Не волнуйтесь! Вы можете покинуть сайт и продолжить с этого момента в любое время
        </Text>
      </FormContainer >
    </div >
  );
}

export default App;