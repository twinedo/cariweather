import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TWSizes, TWStyles } from 'twrn-styles'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Dashboard } from '@/screens'

const App = () => {
  return (
    <SafeAreaProvider>
      <Dashboard />
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})