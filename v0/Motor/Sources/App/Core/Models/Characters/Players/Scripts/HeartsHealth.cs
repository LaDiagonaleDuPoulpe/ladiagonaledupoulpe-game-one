using ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Scripts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Core.Models.Characters.Players.Scripts
{
    /// <summary>
    /// Health of character with hearts.
    /// Each heart gets a health too
    /// </summary>
    public class HeartsHealth : Health
    {
        #region Fields
        private List<Heart> _hearts = new List<Heart>();
        #endregion

        #region Constructors
        public HeartsHealth()
        {
            this.AddHearts(new Heart(100, 100)); // TODO: 09/09/2020, See to Initialize values from database
        }

        public HeartsHealth(params Heart[] hearts) : base()
        {
            this.AddHearts(hearts);
        }
        #endregion

        #region Public methods
        public override void Initialize(int currentValue, int maxValue)
        {
            this._hearts[0].Initialize(currentValue, maxValue);
        }

        /// <summary>
        /// Adds a list of heart to manage specific health
        /// </summary>
        /// <param name="hearts">Array of healths</param>
        public void AddHearts(params Heart[] hearts)
        {
            if (hearts.Length == 0)
            {
                throw new ArgumentException("Must be at least one heart", "hearts");
            }

            this._hearts.AddRange(hearts);
        }
        #endregion

        #region Properties
        public override int CurrentValue 
        { 
            get 
            {
                return this._hearts[0].CurrentValue;
            } 
            set
            {
                this._hearts[0].CurrentValue = value; 
            }
        }

        public override int MaxValue 
        { 
            get 
            {
                return this._hearts[0].MaxValue;
            } 
            set 
            {
                this._hearts[0].MaxValue = value; 
            }
        }
        #endregion
    }
}
