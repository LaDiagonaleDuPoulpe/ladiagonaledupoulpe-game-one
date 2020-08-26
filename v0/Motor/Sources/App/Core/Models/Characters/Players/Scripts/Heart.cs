using ladiagonaledupoulpe.Sources.App.Core.Interfaces.Models.Attacks;
using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts
{
    /// <summary>
    /// One heart of one octopus
    /// </summary>
    public class Heart : IWithDamage
    {
        #region Constructors
        public Heart(int maxValue = 100): this(0, maxValue) {}

        public Heart(int currentValue, int maxValue = 100)
        {
            this.LifePoint = LifePoint.New(currentValue, maxValue);
        }
        #endregion

        #region Public methods
        /// <summary>
        /// Adds damage to the heart life points
        /// </summary>
        /// <param name="hitDamage">Positive value</param>
        public void Hit(int hitDamage)
        {
            hitDamage = Math.Abs(hitDamage);
            this.LifePoint.Add(-hitDamage);
        }
        #endregion

        #region Properties
        /// <summary>
        /// Life point of the heart
        /// </summary>
        public LifePoint LifePoint { get; private set; }
        #endregion
    }
}
