using Godot;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts
{
    /// <summary>
    /// Uses it in health class, or to manage hit
    /// </summary>
    public class LifePoint : Godot.Object
    {
        #region Constructors
        private LifePoint() { }
        #endregion

        #region Public methods
        /// <summary>
        /// Returns a new life point instance
        /// </summary>
        /// <returns></returns>
        public static LifePoint New(int currentValue = 0, int maxValue = 0)
        {
            return new LifePoint()
            {
                CurrentValue = currentValue,
                MaxValue = maxValue
            };
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
        #endregion

        #region Internal methods
        private void ControlRangeOfValue()
        {
            if (this.CurrentValue > this.MaxValue)
            {
                this.CurrentValue = this.MaxValue;
            }

            if (this.CurrentValue < 0)
            {
                this.CurrentValue = 0;
            }
        }
        #endregion

        #region Properties
        /// <summary>
        /// Current value of the life
        /// </summary>
        public int CurrentValue { get; private set; }

        /// <summary>
        /// Maximum value of the life point
        /// </summary>
        public int MaxValue { get; set; }
        #endregion
    }
}
