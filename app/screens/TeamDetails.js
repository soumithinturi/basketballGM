import React, { useState } from 'react';
import { View, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { Text, Button, Avatar, Divider } from 'react-native-elements';
import moment from 'moment';

import NavBar from '../components/Header';
import Team from '../components/Team';
import RosterButton from '../components/RosterButton';
import StatsButton from '../components/StatsButton';
import ScheduleButton from '../components/ScheduleButton';
import FinanceButton from '../components/FinanceButton';

import games from '../config/games';

import EStyleSheet from 'react-native-extended-stylesheet';

const imageWidth = Dimensions.get('window').width;

const styles = EStyleSheet.create({
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  recordContainer: {
    width: imageWidth,
    alignItems: 'center',
    backgroundColor: '#002147',
  },
  record: {
    color: '$white',
    fontWeight: '600',
    paddingBottom: 10,
  },
  upcoming: {
    color: '#002147',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 20,
    paddingTop: 10,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  itemWrapperWin: {
    backgroundColor: '#4BB543',
  },
  itemWrapperLoss: {
    backgroundColor: '#FC100D',
  },
  titleWrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#002147',
  },
  titleWin: {
    color: '$white',
  },
  titleLoss: {
    color: '$white',
  },
  date: {
    color: '#7A8385',
    fontSize: 14,
    fontWeight: '600',
  },
  dateWin: {
    color: '$white',
  },
  dateLoss: {
    color: '$white',
  },
  location: {
    color: '#7A8385',
    fontSize: 12,
  },
  locationWin: {
    color: '$white',
  },
  locationLoss: {
    color: '$white',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: imageWidth * 0.9,
    backgroundColor: '#0046ae',
    marginBottom: 10,
  },
});

const TeamDetails = props => {
  const nextGames = games;
  // State
  const [nextTeam, setNextTeam] = useState(nextGames[0]);

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [win, setWin] = useState(0);

  const [awayScore, setAwayScore] = useState(0);
  const [homeScore, setHomeScore] = useState(0);

  const [simButton, setSimButton] = useState(false);
  const [nextButton, setNextButton] = useState(true);

  const handleRosterPress = () => {
    const { navigation } = props;
    navigation.navigate('Roster');
  };

  const handleStatsPress = () => {
    const { navigation } = props;
    navigation.navigate('Stats');
  };

  const handleSchedulePress = () => {
    const { navigation } = props;
    navigation.navigate('Schedule');
  };

  const handleFinancesPress = () => {
    const { navigation } = props;
    navigation.navigate('Finances');
  };

  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const handleSimulatePress = () => {
    let away = getRandomInt(90, 121);
    let home = getRandomInt(90, 121);

    if (away === home) {
      getRandomInt(0, 2) === 0 ? away + 10 : home + 10;
    }

    setAwayScore(away);
    setHomeScore(home);

    if (away > home) {
      setLosses(losses + 1);
      setWin(-1);
    } else {
      setWins(wins + 1);
      setWin(1);
    }

    setSimButton(true);
    setNextButton(false);
  };

  const handleNextPress = () => {
    setSimButton(false);
    setAwayScore(0);
    setHomeScore(0);
    setWin(0);
    nextGames.shift();
    setNextTeam(nextGames[0]);
    setNextButton(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent={false} barStyle="light-content" />
      <NavBar />
      <Team />
      <View style={styles.recordContainer}>
        <Text h2 style={styles.record}>
          {`${wins} - ${losses}`}
        </Text>
      </View>
      <View style={styles.buttons}>
        <RosterButton onPress={handleRosterPress} />
        <StatsButton onPress={handleStatsPress} />
        <ScheduleButton onPress={handleSchedulePress} />
        <FinanceButton onPress={handleFinancesPress} />
      </View>
      <Divider />
      <Text style={styles.upcoming}>Upcoming</Text>
      <TouchableOpacity>
        <View
          style={
            win > 0
              ? [styles.itemWrapper, styles.itemWrapperWin]
              : win === 0
              ? styles.itemWrapper
              : [styles.itemWrapper, styles.itemWrapperLoss]
          }>
          <Avatar size="medium" source={{ uri: nextTeam.logo }} />
          <View style={styles.titleWrapper}>
            <Text
              style={
                win > 0
                  ? [styles.title, styles.titleWin]
                  : win === 0
                  ? styles.title
                  : [styles.title, styles.titleLoss]
              }>
              {nextTeam.team}
            </Text>
            <Text
              style={
                win > 0
                  ? [styles.date, styles.dateWin]
                  : win === 0
                  ? styles.date
                  : [styles.date, styles.dateLoss]
              }>
              {moment(nextTeam.date).format('dddd, MMM Do')}
            </Text>
            <Text
              style={
                win > 0
                  ? [styles.location, styles.locationWin]
                  : win === 0
                  ? styles.location
                  : [styles.location, styles.locationLoss]
              }>
              {nextTeam.city}
            </Text>
          </View>
          <Text
            style={
              win > 0
                ? [styles.title, styles.titleWin]
                : win === 0
                ? styles.title
                : [styles.title, styles.titleLoss]
            }>{`${awayScore} - ${homeScore}`}</Text>
        </View>
      </TouchableOpacity>
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        disabled={simButton}
        title="Simulate Game"
        onPress={() => handleSimulatePress()}
      />
      <Button
        containerStyle={styles.buttonContainer}
        buttonStyle={styles.button}
        disabled={nextButton}
        title="Next Game"
        onPress={() => handleNextPress()}
      />
    </View>
  );
};

export default TeamDetails;
