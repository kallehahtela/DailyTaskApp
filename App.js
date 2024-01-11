import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {  StyleSheet, View, FlatList, Button } from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/goalInput';

export default function App() {
  const [ModalIsVisible, setModalsIsVisible] = useState(false);
  const [dailyGoals, setDailyGoals] = useState([]);

  function startAddGoalHandler() {
    setModalsIsVisible(true);
  }

  function endAddGoalHandler() {
    setModalsIsVisible(false);
  }

  function addGoalHandler(enteredGoalText) {
    setDailyGoals(currentDailyGoals => [
      ...dailyGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    endAddGoalHandler();
  }

  function deleteGoalHandler(id) {
    setDailyGoals(currentDailyGoals => {
      return currentDailyGoals.filter((goal) => goal.id !== id);
    });
  }

  return (
    <>
    <StatusBar style='light'/>
    <View style={styles.appContainer}>
      <Button title='Add New Goal' color='#a065ec' onPress={startAddGoalHandler}/>
      <GoalInput visible={ModalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
      <View style={styles.goalsContainer}>
        <FlatList
          data={dailyGoals}
          renderItem={itemData => {
            return <GoalItem text={itemData.item.text} id={itemData.item.id} onDeleteItem={deleteGoalHandler} />;
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
          alwaysBounceVertical={false}
        />

      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16
  },
  goalsContainer: {
    flex: 5
  }
});
