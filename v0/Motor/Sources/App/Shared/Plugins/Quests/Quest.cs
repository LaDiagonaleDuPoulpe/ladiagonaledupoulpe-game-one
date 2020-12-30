using ladiagonaledupoulpe.Sources.App.Shared.Interfaces.Quests;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ladiagonaledupoulpe.Sources.App.Shared.Plugins.Quests
{
    /// <summary>
    /// Represents a quest in the game.
    /// Quest has a list of goals (steps) to achieve
    /// </summary>
    public class Quest : IQuest
    {
        #region Fields
        private bool _isMain = true;
        private List<IGoal> _goals = new List<IGoal>();
        #endregion

        #region Constructors
        public Quest(bool isMain = true)
        {
            this._isMain = isMain;
        }

        public Quest() : this(true)
        {
        }
        #endregion

        #region Public methods
        public void Add(IGoal item)
        {
            this._goals.Add(item);
        }

        public void Clear()
        {
            this._goals.Clear();
        }

        public bool Contains(IGoal item)
        {
            return this._goals.Contains(item);
        }

        public void CopyTo(IGoal[] array, int arrayIndex)
        {
            this._goals.CopyTo(array, arrayIndex);
        }

        public IEnumerator<IGoal> GetEnumerator()
        {
            return this._goals.GetEnumerator();
        }

        public int IndexOf(IGoal item)
        {
            return this._goals.IndexOf(item);
        }

        public void Insert(int index, IGoal item)
        {
            this._goals.Insert(index, item);
        }

        public bool Remove(IGoal item)
        {
            return this._goals.Remove(item);
        }

        public void RemoveAt(int index)
        {
            this._goals.RemoveAt(index);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return this._goals.GetEnumerator();
        }
        #endregion

        #region Properties
        public IGoal this[int index] { get => this._goals[index]; set => this._goals[index] = value; }

        public int Count => this._goals.Count;

        public bool IsReadOnly => false;

        /// <summary>
        /// Is all goals are achieved ?
        /// </summary>
        public bool IsAchieved => this._goals.All(item => item.IsAchieved);

        /// <summary>
        /// Main quest or secondary
        /// </summary>
        public bool IsMain => this._isMain;

        /// <summary>
        /// Name of the quest
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// Description of th quest
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Rewards list
        /// </summary>
       public IList<IQuestReward> Rewards { get; private set; }
        #endregion
    }
}
