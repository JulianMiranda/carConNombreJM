import {useContext, useEffect, useState} from 'react';
import {TravelType} from '../interfaces/Travel.type';
import {TravelContext} from '../context/travel/TravelContext';

export const useTravelOptions = () => {
  const {
    travelDate,
    travelFastValue,
    travelFastSharedValue,
    travelScheduleValue,
    travelScheduleSharedValue,
    setTravelValue,
    setTravelType,
  } = useContext(TravelContext);
  const [selected, setSelected] = useState<TravelType>('fast');

  const [showPicker, setShowPicker] = useState(false);

  const updateAgendedText = (date: Date) => {
    const horas = date.getHours().toString().padStart(2, '0');
    const minutos = date.getMinutes().toString().padStart(2, '0');
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0');
    const anio = date.getFullYear().toString().slice(-2);

    const formatoFechaHora = `${horas}:${minutos} ${dia}-${mes}-${anio}`;
    return formatoFechaHora;
  };
  const [scheduleText, setAgendedText] = useState(
    updateAgendedText(new Date()),
  );
  const fastText = '👇 Pograma tu viaje para después';

  const fechaActual = new Date();
  const fechaFutura = new Date(fechaActual);
  fechaFutura.setMinutes(fechaFutura.getMinutes() + 10);

  useEffect(() => {
    setAgendedText(updateAgendedText(travelDate));
  }, [travelDate]);

  const handleCalendar = () => {
    setShowPicker(true);
  };

  const fastSelected = () => {
    setSelected('fast');
    setTravelType('fast');
    setTravelValue(travelFastValue);
  };

  const fastSharedSelected = () => {
    setSelected('fast-shared');
    setTravelType('fast-shared');
    setTravelValue(travelFastSharedValue);
  };
  const scheduleSelected = () => {
    setSelected('schedule');
    setTravelType('schedule');
    setTravelValue(travelScheduleValue);
    handleCalendar();
  };
  const scheduleSharedSelected = () => {
    setSelected('schedule-shared');
    setTravelType('schedule-shared');
    setTravelValue(travelScheduleSharedValue);
    handleCalendar();
  };

  const generateOptions = (selectedComponent: (key: TravelType) => void) => {
    return [
      {
        title: 'Express',
        subtitle: 'Rápido y económico',
        price: travelFastValue,
        onPress: () => selectedComponent('fast'),
        image: require('../assets/express.png'),
        selected: 'fast',
      },
      {
        title: 'Express compartido',
        subtitle: 'Ahorra con seguridad',
        price: travelFastSharedValue,
        onPress: () => selectedComponent('fast-shared'),
        image: require('../assets/handshake.png'),
        selected: 'fast-shared',
      },
      {
        title: 'Agendado',
        subtitle: 'Asegura tu viaje',
        price: travelScheduleValue,
        onPress: () => selectedComponent('schedule'),
        image: require('../assets/calendar.png'),
        selected: 'schedule',
      },
      {
        title: 'Agendado compartido',
        subtitle: 'Asegura tu puesto',
        price: travelScheduleSharedValue,
        onPress: () => selectedComponent('schedule-shared'),
        image: require('../assets/sharedschedule.png'),
        selected: 'schedule-shared',
      },
    ];
  };

  const selectedComponent = (key: TravelType) => {
    switch (key) {
      case 'fast':
        fastSelected();
        break;
      case 'fast-shared':
        fastSharedSelected();
        break;
      case 'schedule':
        scheduleSelected();
        break;
      case 'schedule-shared':
        scheduleSharedSelected();
        break;
    }
  };

  const menuOptions = generateOptions(selectedComponent);
  return {
    menuOptions,
    selected,
    showPicker,
    handleCalendar,
    setShowPicker,
  };
};
