package be.xzan.magicsquare.common

import kotlin.test.*

@Suppress("unused")
class ControllerTest {

  lateinit var controller: Controller

  @BeforeTest
  fun setup() {
    controller = Controller()
  }

  @Test
  fun getScore() {
    assertTrue { controller.score == 1 }
    controller.setAsNext(87, listOf(87))
    assertTrue { controller.score == 2 }
  }

  @Test
  fun reset() {
    controller.reset()
    assertTrue { controller.valueForPosition(0) == 1 }
    assertTrue { controller.hasNextMove() }
    assertEquals(listOf(30, 3, 22), controller.getNextForPosition(0))
  }

  @Test
  fun getNextForTopLeftCorner() {
    assertEquals(listOf(30, 3, 22), controller.getNextForPosition(IntArray(100), 0))
  }

  @Test
  fun getNextForTopLeftCornerWithValue() {
    val array = IntArray(100)
    array[55] = 1
    assertEquals(listOf(30, 3, 22), controller.getNextForPosition(array, 0))
    array[3] = 1
    assertEquals(listOf(30, 22), controller.getNextForPosition(array, 0))
    array[30] = 1
    assertEquals(listOf(22), controller.getNextForPosition(array, 0))
    array[22] = 1
    assertEquals(emptyList(), controller.getNextForPosition(array, 0))
    array[3] = 0
    assertEquals(listOf(3), controller.getNextForPosition(array, 0))
  }

  @Test
  fun getNextForTopRightCorner() {
    assertEquals(listOf(39, 6, 27), controller.getNextForPosition(IntArray(100), 9))
  }

  @Test
  fun getNextForBottomLeftCorner() {
    assertEquals(listOf(60, 93, 72), controller.getNextForPosition(IntArray(100), 90))
  }

  @Test
  fun getNextForBottomRightCorner() {
    assertEquals(listOf(69, 96, 77), controller.getNextForPosition(IntArray(100), 99))
  }

  @Test
  fun getNextForCenter() {
    assertEquals(listOf(25, 85, 52, 58, 33, 77, 37, 73), controller.getNextForPosition(IntArray(100), 55))
  }

  @Test
  fun getNextForLeftCenter() {
    assertEquals(listOf(20, 80, 53, 72, 32), controller.getNextForPosition(IntArray(100), 50))
  }

  @Test
  fun getNextForRightCenter() {
    assertEquals(listOf(29, 89, 56, 37, 77), controller.getNextForPosition(IntArray(100), 59))
  }

  @Test
  fun getNextForTopCenter() {
    assertEquals(listOf(35, 2, 8, 27, 23), controller.getNextForPosition(IntArray(100), 5))
  }

  @Test
  fun getNextForBottomCenter() {
    assertEquals(listOf(65, 92, 98, 73, 77), controller.getNextForPosition(IntArray(100), 95))
  }

  @Test
  fun isPositionValidAsNext() {
    assertTrue { controller.isPositionValidAsNext(1, listOf(1, 2, 3, 4)) }
    assertFalse { controller.isPositionValidAsNext(5, listOf(1, 2, 3, 4)) }
  }

  @Test
  fun setAsNext() {
    assertFalse { controller.setAsNext(5, listOf(1, 2, 3, 4)) }
    assertTrue { controller.setAsNext(2, listOf(1, 2, 3, 4)) }
    assertTrue { controller.isLast(2) }
  }

  @Test
  fun isLast() {
    controller.setAsNext(87, listOf(87))
    assertTrue { controller.isLast(87) }
  }

  @Test
  fun valueForPosition() {
    assertTrue { controller.valueForPosition(0) == 1 }
  }

  @Test
  fun hasNextMove() {
    assertTrue { controller.hasNextMove() }
  }
}