import React, { Component, PropTypes } from 'react';
import Dimensions from 'Dimensions';
import {
	View, 
	StyleSheet
} from 'react-native';

export default class Wallpaper extends Component {
	render() {
		return (
			<View style={styles.wallpaper}>
				{this.props.children}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wallpaper: {
		flex: 1,
		width: null,
		height: null, 
		backgroundColor: 'white'
	},
	picture: {
		flex: 1,
		width: null,
		height: null,
		resizeMode: 'cover',
	},
});
