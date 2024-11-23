import { calculateBloodAlcoholContent } from '@/util/alcoholContent';
import { StyleSheet } from 'react-native';
import { Text, View } from './Themed';
import getBacZone from '@/util/bloodAlcoholZones';

export default function BACMonitor({ alcoholMassConsumed, time }: { alcoholMassConsumed: number; time: number }) {
  const timeHours = time / 3600;
  const bloodAlcoholContent = calculateBloodAlcoholContent('male', alcoholMassConsumed, 100, 2, timeHours);

  const BacZone = getBacZone(bloodAlcoholContent);

  return (
    <View style={[styles.container, { backgroundColor: BacZone?.color }]}>
      <Text>{BacZone?.name}</Text>
      <Text>BAC: {bloodAlcoholContent.toFixed(3)}%</Text>
      <Text>{BacZone?.description}</Text>
      {bloodAlcoholContent > 0.08 && <Text>You will fail a breathalyzer test.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
