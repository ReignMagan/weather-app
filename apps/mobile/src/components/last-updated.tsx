import { StyleSheet, Text } from 'react-native';

import { colors, typography } from '../theme';

type LastUpdatedProps = {
  generatedAt: string;
};

function formatUpdatedTime(value: string) {
  const date = new Date(value);

  return date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit',
  });
}

export function LastUpdated({
  generatedAt,
}: LastUpdatedProps) {
  return (
    <Text style={styles.text}>
      Last updated {formatUpdatedTime(generatedAt)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
  },
});