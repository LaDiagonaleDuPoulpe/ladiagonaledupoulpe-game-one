using ladiagonaledupoulpe.Sources.App.Core.Models.Points;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts
{
    /// <summary>
    /// Use this class to get a proxy of power value and max value
    /// </summary>
    public class PowerPoint : ValuePoint
    {
        #region Constructors
        public PowerPoint() : base() { }

        public PowerPoint(int currentValue = 0, int maxValue = 0) : base(currentValue, maxValue)
        {
        }
        #endregion

        #region Public methods
        public override object Clone()
        {
            return new PowerPoint(this.CurrentValue, this.MaxValue);
        }
        #endregion
    }
}
