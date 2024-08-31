import React, {useContext, useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {TravelContext} from '../context/travel/TravelContext';

interface Props {
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DateTimePickerComponent = ({showPicker, setShowPicker}: Props) => {
  const {travelDate, travelType, setTravelDate, setTravelType} =
    useContext(TravelContext);
  const fechaActual = new Date();
  const [minimumDate, setMinimumDate] = useState(
    new Date(fechaActual.setMinutes(fechaActual.getMinutes() + 30)),
  );
  useEffect(() => {
    console.log(travelType);
    if (showPicker && travelType === 'schedule') {
      setMinimumDate(new Date());
    }
  }, [showPicker, travelType]);

  return (
    <DatePicker
      modal
      open={showPicker}
      date={travelDate}
      onConfirm={date => {
        setShowPicker(false);
        setTravelDate(date);
        travelType === 'fast'
          ? setTravelType('schedule')
          : setTravelType('fast');
      }}
      onCancel={() => {
        setShowPicker(false);
      }}
      minimumDate={minimumDate}
    />
  );
};
