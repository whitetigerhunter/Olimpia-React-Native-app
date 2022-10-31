import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { translate } from '../../translations/translationHelpers';
import styles from './styles';

interface Props {
  date: string;
  onDateChange: (date: string) => void;
}

interface State {
  showPicker: boolean;
  date: Date;
  dateString: string;
}
class DatePicker extends React.PureComponent<Props, State> {
  static defaultProps: { onDateChange: () => void };

  constructor(props: Props) {
    super(props);
    const { date } = props;
    if (date) {
      const year = parseInt(date.split('-')[0]);
      const month = parseInt(date.split('-')[1]) - 1;
      const day = parseInt(date.split('-')[2]);
      const dateObj = new Date(year, month, day);
      this.state = {
        showPicker: false,
        date: dateObj,
        dateString: date,
      };
    } else {
      this.state = {
        showPicker: false,
        date: new Date(),
        dateString: '',
      };
    }
  }

  handleConfirm = (date: Date) => {
    const choosenDate = new Date(date);
    const day = choosenDate.getDate();
    const dayValue = day < 10 ? '0' + day : day;
    const month = choosenDate.getMonth() + 1;
    const monthValue = choosenDate.getMonth() < 10 ? '0' + month.toString() : month.toString();
    const formattedMonthValue = monthValue === '010' ? '10' : monthValue;
    const dateString = choosenDate.getFullYear() + '-' + formattedMonthValue + '-' + dayValue;
    this.setState({ date, dateString, showPicker: false }, () =>
      this.props.onDateChange(this.state.dateString),
    );
  };

  handleCancel = () => this.setState({ showPicker: false });

  handlePress = () => this.setState({ showPicker: true });

  render() {
    const { date, dateString, showPicker } = this.state;
    return (
      <>
        <TouchableOpacity style={styles.pressableTextContainer} onPress={this.handlePress}>
          <View style={styles.textContainer}>
            <View style={styles.date}>
              <Text style={styles.dateText}>{translate('day')}</Text>
              <Text style={styles.dateShow}>{dateString !== '' && dateString.split('-')[2]}</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.dateText}>{translate('month')}</Text>
              <Text style={styles.dateShow}>{dateString !== '' && dateString.split('-')[1]}</Text>
            </View>
            <View style={styles.date}>
              <Text style={styles.dateText}>{translate('year')}</Text>
              <Text style={styles.dateShow}>{dateString !== '' && dateString.split('-')[0]}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={showPicker}
          date={date}
          mode="date"
          minimumDate={new Date(1900, 0, 1)}
          maximumDate={new Date()}
          onConfirm={this.handleConfirm}
          onCancel={this.handleCancel}
          confirmTextIOS={translate('confirm')}
          cancelTextIOS={translate('cancel')}
        />
      </>
    );
  }
}
export default DatePicker;
