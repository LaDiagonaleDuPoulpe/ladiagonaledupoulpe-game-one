using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Points
{
    /// <summary>
    /// Use this class to get a proxy about value point (life point, ...)
    /// </summary>
    public class ValuePoint : Godot.Object
    {
        #region Constructors
        public ValuePoint() { }

        public ValuePoint(int currentValue = 0, int maxValue = 0)
        {
            this.CurrentValue = currentValue;

            if (maxValue <= 0)
            {
                maxValue = currentValue;
            }
            this.MaxValue = maxValue;
        }
        #endregion

        #region Public methods
        /// <summary>
        /// Adds value to the current value
        /// </summary>
        /// <param name="value">Value could be positive or negative</param>
        public void Add(int value)
        {
            this.CurrentValue += value;

            this.ControlRangeOfValue();
        }

        /// <summary>
        /// Defines the current value of the life point, and control the value 
        /// inside the valid range 
        /// </summary>
        /// <param name="currentValue"></param>
        public void Define(int currentValue)
        {
            this.CurrentValue = currentValue;
            this.ControlRangeOfValue();
        }

        public int GetCurrentValue()
        {
            return this.CurrentValue;
        }
        #endregion

        #region Internal methods
        private void ControlRangeOfValue()
        {
            int currentValue = this.CurrentValue;
            ControlRangeOfValue(ref currentValue, this.MaxValue);
            this.CurrentValue = currentValue;
        }

        private static void ControlRangeOfValue(ref int currentValue, int maxValue)
        {
            if (currentValue > maxValue)
            {
                currentValue = maxValue;
            }

            if (currentValue < 0)
            {
                currentValue = 0;
            }
        }

        public static bool operator ==(ValuePoint old, ValuePoint add)
        {
            return old.CurrentValue != add.CurrentValue;
        }

        public static bool operator !=(ValuePoint old, ValuePoint add)
        {
            return old.CurrentValue != add.CurrentValue;
        }

        public static ValuePoint operator +(ValuePoint old, ValuePoint add)
        {
            old.Add(add.CurrentValue);

            return old;
        }

        public static ValuePoint operator -(ValuePoint old, ValuePoint add)
        {
            old.Add(-add.CurrentValue);

            return old;
        }
        #endregion

        #region Properties
        /// <summary>
        /// Current value of the life
        /// </summary>
        public int CurrentValue { get; set; }

        /// <summary>
        /// Maximum value of the life point
        /// </summary>
        public int MaxValue { get; set; }

        /// <summary>
        /// Value is positive and less than max value
        /// </summary>
        public bool IsValid { get => this.CurrentValue >= 0 && this.CurrentValue <= this.MaxValue; }
        #endregion
    }
}
