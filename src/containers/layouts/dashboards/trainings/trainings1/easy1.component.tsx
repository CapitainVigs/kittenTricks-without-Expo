import React from 'react';
import {
  ListRenderItemInfo,
  ScrollView,
  View,
  ViewProps,
} from 'react-native';
import {
  withStyles,
  ThemeType,
  ThemedComponentProps,
  StyleType,
} from '@kitten/theme';
import { Exercise } from '@src/core/model/exercise.model';
import {
  TrainingCard1,
  TrainingCardProps,
} from '@src/components/trainings/trainingCard.component';
import {
  ViewPager,
  List,
} from '@kitten/ui';
import { Text } from '@src/components/common';

interface ComponentProps {
  exercises: Exercise[];
  onTrainingDetails: (index: number) => void;
}

interface State {
  selectedPagerIndex: number;
}

export type Easy1ComponentProps = ThemedComponentProps & ComponentProps;

class Easy1Component extends React.Component<Easy1ComponentProps, State> {

  public state: State = {
    selectedPagerIndex: 0,
  };

  private onChangePager = (selectedPagerIndex: number): void => {
    this.setState({ selectedPagerIndex });
  };

  private onTrainingDetails = (index: number): void => {
    this.props.onTrainingDetails(index);
  };

  private renderPagerIndicator = (index: number): React.ReactElement<ViewProps> => {
    const { themedStyle, exercises } = this.props;
    const additionalStyle: StyleType = index === this.state.selectedPagerIndex ?
      themedStyle.pagerIndicatorSelected : null;
    const marginStyle: StyleType = index === exercises.length - 1 ?
      null : themedStyle.indicatorMarginRight;

    return (
      <View
        style={[themedStyle.pagerIndicator, additionalStyle, marginStyle]}
        key={index}
      />
    );
  };

  private renderPagerCard = (exercise: Exercise, index: number): React.ReactElement<TrainingCardProps> => {
    const { themedStyle, exercises } = this.props;
    const marginStyle: StyleType = index === exercises.length - 1 ?
      null : themedStyle.pagerCardMargin;

    return (
      <TrainingCard1
        key={index}
        index={index}
        style={[themedStyle.pagerCard, marginStyle]}
        training={exercise}
        onDetails={this.onTrainingDetails}
      />
    );
  };

  private renderPager = (): React.ReactElement<ViewProps> => {
    const { themedStyle } = this.props;

    return (
      <View>
        <ViewPager
          contentWidth={226}
          selectedIndex={this.state.selectedPagerIndex}
          onSelect={this.onChangePager}>
          {this.props.exercises.map(this.renderPagerCard)}
        </ViewPager>
        <View style={themedStyle.pagerIndicatorContainer}>
          {this.props.exercises
            .map((item: Exercise, i: number) => this.renderPagerIndicator(i))}
        </View>
      </View>
    );
  };

  private renderListCard = (info: ListRenderItemInfo<Exercise>): React.ReactElement<TrainingCardProps> => {
    return (
      <TrainingCard1
        style={this.props.themedStyle.listCard}
        training={info.item}
        index={info.index}
        onDetails={this.onTrainingDetails}
      />
    );
  };

  public render(): React.ReactNode {
    const { themedStyle, exercises } = this.props;

    return (
      <ScrollView contentContainerStyle={themedStyle.container}>
        <Text style={themedStyle.pagerLabel}>MOST POPULAR</Text>
        {this.renderPager()}
        <List
          data={exercises}
          renderItem={this.renderListCard}
        />
      </ScrollView>
    );
  }
}

export const Easy1 = withStyles(Easy1Component, (theme: ThemeType) => ({
  container: {
    padding: 16,
    flexGrow: 1,
  },
  pagerLabel: {
    fontSize: 15,
    color: theme['color-basic-600'],
    marginBottom: 16,
  },
  pagerCard: {
    width: 226,
  },
  listCard: {
    marginBottom: 16,
  },
  pagerCardMargin: {
    marginRight: 16,
  },
  pagerIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  pagerIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme['color-basic-300'],
  },
  pagerIndicatorSelected: {
    backgroundColor: theme['color-black'],
  },
  indicatorMarginRight: {
    marginRight: 12,
  },
}));
